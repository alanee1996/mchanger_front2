import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GenericModel } from '../Models/genericModel';
import {
  MatSnackBar
} from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../Services/user-service.service';
import { UserDetail } from '../Models/user';



@Component({
  selector: 'app-user-crd',
  templateUrl: './user.crd.html'
})
export class UserCRDComponent implements OnInit {
  public message: string;
  public model: GenericModel<UserDetail>;
  public data: UserDetail = new UserDetail();
  public userForm: FormGroup;
  public title;
  public isCreate: boolean;

  constructor(
    private userService: UserService,
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
            // tslint:disable-next-line:radix
            this.userService.getUserDetails(parseInt(id))
              .subscribe(d => {
                this.model = d;
                if (d.status === 'failed') {
                  this.snackBar.open(this.model.message);
                }
                this.data = this.model.data;
              });
          }
        } else {
          this.formInit();
          this.title = 'User Creation';
          this.isCreate = true;
          // this.userService.getCreateUserDetails()
          //   .subscribe(d => {
          //     this.model = d;
          //     if (d.status === 'failed') {
          //       this.snackBar.open(this.model.message);
          //     }
          //     this.data = this.model.data;
          //     this.data.active = null;
          //   });
        }
      } else {
        this.message = 'Invalid action detected';
      }
    });
  }

  formInit() {
    this.userForm = new FormGroup({
      'email': new FormControl(
        this.data.email,
        [
          Validators.required,
          Validators.email
        ]),

    });
  }

  onSubmit(event) {
    console.log('update');
    if (!this.userForm.invalid) {

    }
  }

  onSubmitCreate(event) {
    console.log('create');

    if (!this.userForm.invalid) {

    }
  }

  decider(event) {
    event.preventDefault();
    if(this.isCreate){
      this.onSubmitCreate(event);
    }
    else{
      this.onSubmit(event);
    }
  }
}
