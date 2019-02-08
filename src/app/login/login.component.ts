import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { LoginModel } from '../Models/login-model';
import { User } from '../Models/user';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

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

  constructor(private auth: AuthService, private router: Router, private alert: MatSnackBar) {}

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
    if (!this.loginForm.invalid) {
      const res = this.auth.login(this.loginModel);
      res.then(d => {
        if (d.status === 'failed') {
          this.alert.open(d['message'], 'Dismiss', { duration: 2000 });
        } else {
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
}
