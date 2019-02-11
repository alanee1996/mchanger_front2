import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfig } from '../app-config';
import { AuthService } from './auth.service';
import { ProfileDialogModel } from '../Models/ProfileImgModel';
import { Observable } from 'rxjs';
import { GenericModel } from '../Models/genericModel';
import { User, UserDetail } from '../Models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public host = AppConfig.domain;

  constructor(private http: HttpClient, private auth: AuthService) { }

  public uploadProfileImage(model: ProfileDialogModel): Observable<GenericModel<any>> {
    const headers: HttpHeaders = this.auth.getSecureHeader() as HttpHeaders;
    const formData = new FormData();
    formData.append('image', model.image);
    console.log(headers);
    const res = this.http.post<GenericModel<any>>(this.host + 'media/profile/upload', formData, {
      headers: this.auth.getSecureHeader()
    });
    return res;
  }

  public updateProfileInfo(model: User): Observable<User> {
    const headers = this.auth.getSecureHeader();
    headers.append('Content-Type', 'application/json');
    const res = this.http.post<User>(this.host + 'user/admin/profile/update', model, {
      headers: headers
    });
    return res;
  }

  public getUserList(pageNo: Number = 1): Observable<GenericModel<Array<UserDetail>>> {
    const headers = this.auth.getSecureHeader();
    const res = this.http.get<GenericModel<Array<UserDetail>>>(this.host + 'user/list', {
      headers: headers,
      params: new HttpParams().append('pageNo', pageNo.toString())
    });
    return res;
  }

  public getUserDetails(id: Number): Observable<GenericModel<UserDetail>> {
    const headers = this.auth.getSecureHeader();
    const res = this.http.get<GenericModel<UserDetail>>(this.host + 'user/update/' + id.toString(), {
      headers: headers
    });
    return res;
  }

  // public getCreateUserDetails(): Observable<GenericModel>{

  // }
}
