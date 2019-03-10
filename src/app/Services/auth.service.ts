import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AppConfig } from '../app-config';
import { LoginModel } from '../Models/login-model';
import { User } from '../Models/user';
import { Observable } from 'rxjs';
import { TokenExpiredException } from '../Exceptions/TokenExpiredException';
import { Router } from '@angular/router';
import { GenericModel } from '../Models/genericModel';
import { ForgetPasswordModel } from '../Models/forgetPasswordModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private domain = AppConfig.domain;

  constructor(private http: HttpClient, public router: Router) {

  }

  public async login(loginModel: LoginModel) {
    const res = this.http.post<User>(this.domain + 'auth/admin/login', null, {
      headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded'),
      params: new HttpParams().append('username', loginModel.username).append('password', loginModel.password)
    });
    const result = { status: '', message: '' };
    await res.toPromise().then((d => {
      if (d['status'] === 'failed') {
        result.status = d['status'];
        result.message = d['message'];
      } else {
        if (loginModel.remember) {
          this.setStorage(d);
        } else {
          this.setSession(d);
        }
      }
    }));
    return result;
  }

  public logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  public getUserProfile(): Observable<User> {
    const res = this.http.get<User>(this.domain + 'user/profile', {
      headers: this.getSecureHeader()
    });
    return res;
  }

  public getToken(): string {
    if (this.isLogin) {
      if (this.isSession()) {
        const t = JSON.parse(sessionStorage.getItem('token'));
        this.http.get(this.domain + 'auth/checkAccessToken', {
          params: new HttpParams().append('accessToken', t.accessToken)
        }).subscribe((d) => {
          if (d['status'] === 'failed') {
            throw new Error(d['message']);
          }
          if (d['data']['expired'] === true) {
            this.http.post(this.domain + 'auth/refresh/token', null, {
              headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded'),
              params: new HttpParams().append('refreshToken', t.refreshToken)
            }).subscribe((d2) => {
              if (d2['status'] === 'failed' && d2['message'] === 'Refresh Token Expired') {
                this.logout();
              } else {
                this.setSession(d2);
              }
            });
          }
        });
        return JSON.parse(sessionStorage.getItem('token')).accessToken;
      } else if (this.isStorage()) {
        const t = JSON.parse(localStorage.getItem('token'));
        this.http.get(this.domain + 'auth/checkAccessToken', {
          params: new HttpParams().append('accessToken', t.accessToken)
        }).subscribe((d) => {
          if (d['status'] === 'failed') {
            throw new Error(d['message']);
          }
          if (d['data']['expired'] === true) {
            this.http.post(this.domain + 'auth/refresh/token', null, {
              headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded'),
              params: new HttpParams().append('refreshToken', t.refreshToken)
            }).subscribe((d2) => {
              if (d2['status'] === 'failed' && d2['message'] === 'Refresh Token Expired') {
                this.logout();
              } else {
                this.setStorage(d2);
              }
            });
          }
        });
        return JSON.parse(localStorage.getItem('token')).accessToken;
      }
      throw new Error('Unable to find the token');
    }
    throw new TokenExpiredException('Token is already expired please login again');
  }

  public isLogin(): boolean {
    return this.isSession() || this.isStorage() ? true : false;
  }

  public isSession(): boolean {
    const token = JSON.parse(sessionStorage.getItem('token') || 'false');
    const access = JSON.parse(sessionStorage.getItem('access') || 'false');
    if (!token && !access) {
      sessionStorage.clear();
      return false;
    }
    return true;
  }

  public isStorage(): boolean {
    const token = JSON.parse(localStorage.getItem('token') || 'false');
    const access = JSON.parse(localStorage.getItem('access') || 'false');
    if (!token && !access) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  public getSecureHeader(): HttpHeaders {
    return new HttpHeaders().append('Authorization', 'Bearer ' + this.getToken());
  }

  private setSession(data) {
    sessionStorage.setItem('token', JSON.stringify(data['tokenInfo']));
    sessionStorage.setItem('access', JSON.stringify(data['data']['access']));
  }


  private setStorage(data) {
    localStorage.setItem('token', JSON.stringify(data['tokenInfo']));
    localStorage.setItem('access', JSON.stringify(data['data']['access']));
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }

  public resetPassword(oldpass: string, newpass: string): Observable<GenericModel<Object>> {
    const header = this.getSecureHeader() as HttpHeaders;
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    const formData = new FormData();
    formData.append('oldpassword', oldpass);
    formData.append('newpassword',newpass);
    const res = this.http.post<GenericModel<Object>>(this.domain + 'auth/reset/password', formData , {
      headers: header,
    });
    return res;
  }

  public forgetPassword(model: ForgetPasswordModel): Observable<GenericModel<ForgetPasswordModel>> {
    const res = this.http.post<GenericModel<ForgetPasswordModel>>(this.domain + 'auth/forget/password', model);
    return res;
  }
}
