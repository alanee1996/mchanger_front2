import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GenericModel } from '../Models/genericModel';
import {
  MatSnackBar
} from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../Services/user-service.service';
import { UserDetail, UserType } from '../Models/user';
import { RoleService } from '../Services/role.service';
import { Role } from '../Models/role';
import { AuthService } from '../Services/auth.service';



@Component({
  selector: 'app-user-crd',
  templateUrl: './user.crd.html'
})
export class UserCRDComponent implements OnInit {
  public message: string;
  public model: GenericModel<UserDetail> = new GenericModel<UserDetail>();
  public simpleRole: GenericModel<Array<Role>> = new GenericModel<Array<Role>>();
  public data: UserDetail = new UserDetail();
  public userForm: FormGroup;
  public title;
  public isCreate: boolean;
  // tslint:disable-next-line:no-input-rename
  public type: string;
  public userType: Array<UserType>;

  constructor(
    private userService: UserService,
    public auth: AuthService,
    private roleService: RoleService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.userService.getUserType().toPromise().then(d => {
      if (d.status === 'failed') {
        this.snackBar.open(d.message, 'Dismiss', { duration: 3000 });
      } else {
        this.userType = d.data;
      }
    });
    this.roleService.getSimpleRoleList().toPromise().then(d => {
      if (d.status === 'failed') {
        this.snackBar.open(d.message, 'Dismiss', { duration: 3000 });
      } else {
        this.simpleRole = d;
      }
    });
    this.init();
    this.formInit('update');
  }

  init() {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      const action = params.get('action');
      if (action === 'create' || action === 'update') {
        if (action === 'update') {
          if (!this.auth.havePermissions(['MODIFY_USER'])) {
            this.router.navigate(['/accessdenied']);
          }
          this.title = 'User Modification';
          this.isCreate = false;
          let id: string = null;
          this.activeRoute.queryParamMap.subscribe(qparams => {
            id = qparams.get('id');
          });
          if (!id) {
            this.message =
              'Update user need to make sure user id is past together with the route';
          } else {
            this.getData(id);
          }
        } else {
          if (!this.auth.havePermissions(['CREATE_USER'])) {
            this.router.navigate(['/accessdenied']);
          }
          this.title = 'User Creation';
          this.isCreate = true;
          this.formInit(action);
          this.data = new UserDetail();
        }
      } else {
        this.message = 'Invalid action detected';
      }
    });
  }

  formInit(action: string) {
    this.userForm = new FormGroup({
      'username': new FormControl(
        this.data.username,
        [
          Validators.required
        ]
      ),
      'email': new FormControl(
        this.data.email,
        [
          Validators.required,
          Validators.email
        ]),
      'fname': new FormControl(
        this.data.fname,
        [
          Validators.required
        ]
      ),
      'lname': new FormControl(
        this.data.lname,
        [
          Validators.required
        ]
      ),
    });
    if (action === 'create' || this.auth.havePermissions(['DISABLE_USER'])) {
      this.userForm.addControl(
        'active', new FormControl(
          this.data.active,
          [
            Validators.required
          ]
        ),
      );
    }
    this.type = this.activeRoute.snapshot.queryParams['type']
    if (!this.isCreate && this.type !== 'admin') {
      this.userForm.addControl('phone', new FormControl(this.data.phone, [Validators.required]));
      this.userForm.addControl('career', new FormControl(this.data.career, [Validators.required]));
      this.userForm.addControl('business', new FormControl(this.data.businessNature, [Validators.required]));
      this.userForm.addControl('ic', new FormControl(this.data.ic));
      this.userForm.addControl('passport', new FormControl(this.data.passportNo));
    }
    if (this.isCreate || this.type === 'admin') {
      this.userForm.addControl('role', new FormControl(
        this.data.roleId,
        [
          Validators.required
        ]
      ));
    }

    if (this.isCreate) {
      this.userForm.get('username').enable();
      this.userForm.get('email').enable();
    } else {
      this.userForm.get('username').disable();
      this.userForm.get('email').disable();
    }
  }

  onSubmit(event) {
    if (!this.userForm.invalid) {
      if (!this.data.ic && !this.data.passportNo && !this.isCreate && this.data.type === 'customer')
      {
        this.snackBar.open('Either IC or password cannot be empty', 'Dismiss', {duration: 3000});
      } else {
        this.userService.updateUser(this.data.userId.toString(), this.data).toPromise().then(d => {
          this.model = d;
          if (d.status !== 'failed') {
            this.data = this.model.data;
          }
          this.snackBar.open(this.model.message, 'Dismiss', {duration: 3000});
        });
      }

    }
  }

  onSubmitCreate(event) {
    if (!this.userForm.invalid) {
      this.userService.CreateUserDetails(this.data).subscribe(d => {
        if (d.status !== 'failed') {
          setTimeout(() => {
           this.router.navigate(['../../'], { relativeTo: this.activeRoute });
          }, 4000);
         }
        this.snackBar.open(d.message, 'Dismiss', {duration: 3000});
      });
    }
  }

  decider(event) {
    event.preventDefault();
    if(this.isCreate){
      this.onSubmitCreate(event);
    } else {
      this.onSubmit(event);
    }
  }

  async getData(id) {
// tslint:disable-next-line: radix
    await this.userService.getUserDetails(parseInt(id))
    .toPromise().then(d => {
      this.model = d;
      if (d.status === 'failed') {
        this.snackBar.open(this.model.message);
      }
      this.data = this.model.data;
    });
  }
}
