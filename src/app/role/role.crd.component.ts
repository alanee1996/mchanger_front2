import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../Services/role.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GenericModel } from '../Models/genericModel';
import {
  MatSnackBar
} from '@angular/material';
import { RoleDetailModel } from '../Models/role-detail-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';



@Component({
  selector: 'app-role-crd',
  templateUrl: './role.crd.html'
})
export class RoleCRDComponent implements OnInit {
  public message: string;
  public model: GenericModel<RoleDetailModel>;
  public data: RoleDetailModel = new RoleDetailModel();
  public roleForm: FormGroup;
  public title;
  public isCreate: boolean;

  constructor(
    private roleService: RoleService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute
  ) {  }

  ngOnInit() {
    this.init();
    this.formInit();
  }

  init() {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      const action = params.get('action');
      if (action === 'create' || action === 'update') {
        if (action === 'update') {
          if (!this.auth.havePermissions(['EDIT_ROLE'])) {
            this.router.navigate(['/accessdenied']);
          }
          this.title = 'Role Modification';
          this.isCreate = false;
          let id: string = null;
          this.activeRoute.queryParamMap.subscribe(qparams => {
            id = qparams.get('id');
          });
          if (!id) {
            this.message =
              'Update role need to make sure role id is past together with the route';
          } else {
            // tslint:disable-next-line:radix
            this.roleService.getRoleDetails(parseInt(id))
              .subscribe(d => {
                this.model = d;
                if (d.status === 'failed') {
                  this.snackBar.open(this.model.message);
                }
                this.data = this.model.data;
              });
          }
        } else {
          if (!this.auth.havePermissions(['CREATE_ROLE'])) {
            this.router.navigate(['/accessdenied']);
          }
          this.formInit();
          this.title = 'Role Creation';
          this.isCreate = true;
          this.roleService.getCreateRoleDetails()
            .subscribe(d => {
              this.model = d;
              if (d.status === 'failed') {
                this.snackBar.open(this.model.message);
              }
              this.data = this.model.data;
              this.data.roleStatus = null;
            });
        }
      } else {
        this.message = 'Invalid action detected';
      }
    });
  }

  formInit() {
    this.roleForm = new FormGroup({
      'rolename': new FormControl(
        this.data.rolename,
        [
          Validators.required
        ]
      ),
      'isactive': new FormControl(
        this.data.roleStatus,
        [
          Validators.required
        ]
      ),
    });
  }

  onSubmit(btn: HTMLButtonElement) {
    btn.click();
    if (!this.roleForm.invalid) {
      this.roleService.updateRole(this.data).subscribe(d => {
        this.model = d;
        if (this.model.status === 'success') {
          this.data = this.model.data;
        }
        setTimeout(() => {
          this.router.navigate(['../../'], { relativeTo: this.activeRoute });
        }, 4000);
        this.snackBar.open(this.model.message, 'Dismiss', { duration: 3000 });
      });
    }
  }

  onSubmitCreate(btn: HTMLButtonElement) {
    btn.click();
    if (!this.roleForm.invalid) {
      this.roleService.createRole(this.data).subscribe(d => {
        this.model = d;
        if (this.model.status === 'success') {
          this.data = this.model.data;
        }
          setTimeout(() => {
            this.router.navigate(['../../'], { relativeTo: this.activeRoute });
          }, 4000);
        this.snackBar.open(this.model.message, 'Dismiss', { duration: 3000 });
      });
    }
  }
}
