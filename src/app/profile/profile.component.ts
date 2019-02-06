import { Component, OnInit, Input } from '@angular/core';
import { User } from '../Models/user';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { Validators, FormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material';
import { ProfileImgDialogComponent } from '../profile-img-dialog/profile-img-dialog.component';
import { ProfileUpdateModel } from '../Models/profileUpdateModel';
import { ProfileDialogModel } from '../Models/ProfileImgModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../Services/user-service.service';

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
  public updateModel: ProfileUpdateModel;

  constructor(private auth: AuthService, private router: Router, public dialog: MatDialog,
    private spinner: NgxSpinnerService, private userServive: UserService) { }

  ngOnInit() {
    if (this.auth.isLogin()) {
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
    } else {
        this.router.navigate(['/']);
    }

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
          alert('Profile image uploaded successful');
        } else {
          alert(result.response.message);
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
    this.userServive.updateProfileInfo(this.userInfo).subscribe(d => {
      console.log(d);
    });
  }
}

