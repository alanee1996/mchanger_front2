import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { LoginModel } from '../Models/login-model';
import { User } from '../Models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { ForgetPasswordModel } from '../Models/forgetPasswordModel';
import { GenericModel } from '../Models/genericModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginModel = new LoginModel();
  public hasError = false;
  public errorMessage;
  public user: User;
  loginForm: FormGroup;

  constructor(private auth: AuthService, private router: Router, private alert: MatSnackBar, private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit() {
    if (this.auth.isLogin()) {
      this.router.navigate(['/dashboard']);
    }
      this.loginForm = new FormGroup({
        'username': new FormControl(
          this.loginModel.username,
          [
            Validators.required
          ]),
        'password': new FormControl(
          this.loginModel.password,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(10),
          ]),
        'check': new FormControl(
        )
      });
  }

  login(event) {
    event.preventDefault();
    const returnUrl = this.route.snapshot.paramMap.get('returnUrl');
    if (!this.loginForm.invalid) {
      const res = this.auth.login(this.loginModel);
      res.then(d => {
        if (d.status === 'failed') {
          this.alert.open(d['message'], 'Dismiss', { duration: 2000 });
        } else {
          if (returnUrl) {
            this.router.navigate([returnUrl]);
          } else {
            this.router.navigate(['/dashboard']);
         }
        }
      });
    }
  }

  dialogOpen() {
    const dialogRef = this.dialog.open(ForgetPasswordComponent, {
      width: '750px',
      data: new GenericModel<ForgetPasswordModel>()
    });

    dialogRef.afterClosed().subscribe((result: GenericModel<ForgetPasswordModel>) => {
      if (result !== undefined) {
          this.alert.open(result.message , 'Dismiss', {
            duration: 3000,
          });
      }
    });
  }
}
