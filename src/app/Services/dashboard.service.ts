import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExchangeRate } from '../Models/exchangeRate';
import { GenericModel } from '../Models/genericModel';
import { AppConfig } from '../app-config';
import { BestSalesCurrency, Sales } from '../Models/chartModel';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private host = AppConfig.domain;

  constructor(public authService: AuthService, public http: HttpClient) { }

  public getCurrecnyRates(): Observable<GenericModel<ExchangeRate>> {
    const res = this.http.get<GenericModel<ExchangeRate>>
      (this.host + 'currency/display/currencies', { headers: this.authService.getSecureHeader() });
    return res;
  }

  public getBestCurrencySelling(month: Number): Observable<GenericModel<Array<BestSalesCurrency>>> {
    const res = this.http.get<GenericModel<Array<BestSalesCurrency>>>(
      this.host + 'common/best/sales/currency',
      {
        headers: this.authService.getSecureHeader(),
        params: new HttpParams().append('month', month.toString())
      }
    );
    return res;
  }

  public getSales(): Observable<GenericModel<Array<Sales>>> {
    const res = this.http.get<GenericModel<Array<Sales>>>(this.host + 'common/sales/month',
      { headers: this.authService.getSecureHeader() });
    return res;
  }
}
