import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AppConfig } from '../app-config';
import { Observable } from 'rxjs';
import { GenericModel } from '../Models/genericModel';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Role } from '../Models/role';
import { RoleDetailModel } from '../Models/role-detail-model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private domain = AppConfig.domain;

  constructor(private auth: AuthService, private http: HttpClient) { }

  public getAllRole(pageNo: number): Observable<GenericModel<Array<Role>>> {
    const res = this.http.get<GenericModel<Array<Role>>>(this.domain + 'role/list', {
      headers: this.auth.getSecureHeader(),
      params: new HttpParams().append('page', pageNo.toString())
    });
    return res;
  }

  public getRoleDetails(roleId: Number): Observable<GenericModel<RoleDetailModel>> {
    const res = this.http.get<GenericModel<RoleDetailModel>>(this.domain + 'role/update/' + roleId.toString(), {
      headers : this.auth.getSecureHeader()
    });
    return res;
  }
}
