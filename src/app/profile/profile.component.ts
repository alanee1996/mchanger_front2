import { Component, OnInit, Input } from '@angular/core';
import { User } from '../Models/user';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MatSnackBar} from '@angular/material';
import { ProfileImgDialogComponent } from '../profile-img-dialog/profile-img-dialog.component';
import { ProfileUpdateModel } from '../Models/profileUpdateModel';
import { ProfileDialogModel } from '../Models/ProfileImgModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../Services/user-service.service';
import { GenericModel } from '../Models/genericModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('userInfo')
  public userInfo: User = new User();
  public hasError = false;
  public errorMessage;
  public profileForm: FormGroup;
  public resetForm: FormGroup;
  public updateModel: ProfileUpdateModel;
  public oldpass: string;
  public newpass: string;

  constructor(public auth: AuthService, private router: Router, public dialog: MatDialog,
    private spinner: NgxSpinnerService, private userServive: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    // if (this.auth.isLogin()) {
      this.auth.getUserProfile().subscribe((d) => {
        if (d['status'] === 'failed') {
          this.hasError = true;
          this.errorMessage = d['message'];
        } else {
          this.hasError = false;
          this.errorMessage = null;
          this.userInfo = d['data'];
        }
      });
    // } else {
    //     this.router.navigate(['/']);
    // }

    this.profileForm = new FormGroup({
      'email': new FormControl(
        this.userInfo.email,
        [
          Validators.required,
          Validators.email,
        ]
      ),
      'contact': new FormControl(
        this.userInfo.phone,
        [
          Validators.required
        ]
      ),
      'fname': new FormControl(
        this.userInfo.fname,
        [
          Validators.required
        ]
      ),
      'lname': new FormControl(
        this.userInfo.lname,
        [
          Validators.required
        ]
      )
    });

    this.resetForm = new FormGroup({
      'oldpassword': new FormControl(
        this.oldpass,
        [
          Validators.required,
        ]
      ),
      'newpassword': new FormControl(
        this.newpass,
        [
          Validators.required,
        ]
      )
    });

  }

  public update(event) {
    event.preventDefault();
  }

  dialogOpen() {
    const model = new ProfileDialogModel(null, this.userInfo.profile_img);
    const dialogRef = this.dialog.open(ProfileImgDialogComponent, {
      width: '750px',
      data: model
    });

    dialogRef.afterClosed().subscribe((result: ProfileDialogModel) => {
      if (result !== undefined) {
              // tslint:disable-next-line:max-line-length
        if (result.response.status === 'success' && result.response.fileResponse.getFileUrl !== undefined && result.response.fileResponse.getFileUrl !== null) {
          this.userInfo.profile_img = result.response.fileResponse.getFileUrl;
          this.snackBar.open('Profile image uploaded successful', 'Dismiss', {
            duration: 2000,
          });
        } else {
          this.snackBar.open(result.response.message , 'Dismiss', {
            duration: 2000,
          });
        }
      }
    });
  }

  logout() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.auth.logout();
    }, 4000);

  }

  updateProfile(event) {
    event.preventDefault();
    if (!this.profileForm.invalid) {
      this.userServive.updateProfileInfo(this.userInfo).subscribe(d => {
        if (d['status'] === 'success') {
          this.userInfo = d['data'];
        }
        this.snackBar.open(d['message'] , 'Dismiss', {
          duration: 2000,
        });
      });
    }
  }

  resetPassword(event) {
    event.preventDefault();
    if (!this.resetForm.invalid) {
      this.auth.resetPassword(this.oldpass, this.newpass).subscribe(m => {
        this.snackBar.open(m.message, 'Dismiss', {
          duration: 2000,
        });
      });
    }
  }
}


