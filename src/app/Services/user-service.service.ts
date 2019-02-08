import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfig } from '../app-config';
import { AuthService } from './auth.service';
import { ProfileDialogModel } from '../Models/ProfileImgModel';
import { Observable } from 'rxjs';
import { GenericModel } from '../Models/genericModel';
import { User } from '../Models/user';


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
}
