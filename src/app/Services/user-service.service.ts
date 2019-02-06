import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppConfig } from '../app-config';
import { AuthService } from './auth.service';
import { ProfileDialogModel } from '../Models/ProfileImgModel';
import { Observable } from 'rxjs';
import { GenericModel } from '../Models/genericModel';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public host = AppConfig.domain;

  constructor(private http: HttpClient, private auth: AuthService) { }

  public uploadProfileImage(model: ProfileDialogModel): Observable<GenericModel> {
    const headers: HttpHeaders = this.auth.getSecureHeader() as HttpHeaders;
    const formData = new FormData();
    formData.append('image', model.image);
    console.log(headers);
    const res = this.http.post<GenericModel>(this.host + 'media/profile/upload', formData, {
      headers: this.auth.getSecureHeader()
    });
    return res;
  }
}
