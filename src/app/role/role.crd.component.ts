import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../Services/role.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GenericModel } from '../Models/genericModel';
import {
  MatSnackBar,
  MatTab,
  MatTableDataSource,
  MatPaginator
} from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { RoleDetailModel } from '../Models/role-detail-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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

  constructor(
    private roleService: RoleService,
    private router: Router,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
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
          this.title = 'Role Modification';
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
          this.title = 'Role Creation';
          this.data = new RoleDetailModel();
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

  onSubmit() {
    console.log(this.data);
  }
}
