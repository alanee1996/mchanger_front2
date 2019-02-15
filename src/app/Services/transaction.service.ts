import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericModel } from '../Models/genericModel';
import { TransactionModel } from '../Models/transactionModel';
import { AppConfig } from '../app-config';
import { Withdrawal } from '../Models/Withdrawal';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private host = AppConfig.domain;

  constructor(public auth: AuthService, private http: HttpClient) { }


  public getTransactionList(pageNo: Number = 1): Observable<GenericModel<Array<TransactionModel>>> {
    const res = this.http.get<GenericModel<Array<TransactionModel>>>(this.host + 'transaction/list', {
      headers: this.auth.getSecureHeader(),
      params: new HttpParams().append('pageNo', pageNo.toString())
    });
    return res;
  }


  public getTransactionDetail(id: string): Observable<GenericModel<TransactionModel>> {
    const res = this.http.get<GenericModel<TransactionModel>>(this.host + 'transaction/detail/' + id, {
      headers: this.auth.getSecureHeader()
    });
    return res;
  }

  public search(value: string, pageno: Number = 1):  Observable<GenericModel<Array<TransactionModel>>> {
    const res = this.http.get<GenericModel<Array<TransactionModel>>>(this.host + 'transaction/search', {
      headers: this.auth.getSecureHeader(),
      params: new HttpParams().append('search', value).append('pageNo', pageno.toString())
    });
    return res;
  }

  public withdraw(model: Withdrawal): Observable<GenericModel<TransactionModel>> {
    const res = this.http.post<GenericModel<TransactionModel>>(this.host + 'wallet/withdraw', model, {
      headers: this.auth.getSecureHeader()
    });
    return res;
  }
}
