import { Component, OnInit } from '@angular/core';
import { GenericModel } from '../Models/genericModel';
import { ExchangeRate } from '../Models/exchangeRate';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from '../Services/dashboard.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public months = [
    { id: 1, value: 'January' },
    { id: 2, value: 'February' },
    { id: 3, value: 'March' },
    { id: 4, value: 'April' },
    { id: 5, value: 'May' },
    { id: 6, value: 'June' },
    { id: 7, value: 'July' },
    { id: 8, value: 'August' },
    { id: 9, value: 'September' },
    { id: 10, value: 'Octorber' },
    { id: 11, value: 'November' },
    { id: 12, value: 'December' },
  ];

  public rates: GenericModel<ExchangeRate> = new GenericModel<ExchangeRate>();
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutSelectedMonth: number;
  public doughnutReady = false;

  public barChartLabels:string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartReady = false;
  public barChartData: any[] = [];

  constructor(private spinner: NgxSpinnerService, private dashService: DashboardService, private alert: MatSnackBar) {
    this.initCurrencyRate();
    this.bestSellCurrency();
    this.monthlySales();
  }

  ngOnInit() {

  }

  async initCurrencyRate() {
    await this.dashService.getCurrecnyRates().toPromise().then(d => {
      if (d.status === 'success') {
        this.rates = d;
      } else {
        this.alert.open(d.message, 'Dismiss', { duration: 30000 });
      }
    });
  }

  async bestSellCurrency(month: number = 0) {
    const date = new Date();
    this.doughnutSelectedMonth = month > 0 ? month : date.getMonth() + 1;
    await this.dashService.getBestCurrencySelling(month > 0 ? month : this.doughnutSelectedMonth).toPromise().then(d => {
      if (d.status === 'success') {
        this.doughnutChartLabels = [];
        this.doughnutChartData = [];
        if (d.data.length !== 0) {
          d.data.forEach(c => {
            this.doughnutChartLabels.push(c.currency);
            this.doughnutChartData.push(c.total);
          });
        }
      } else {
        this.alert.open(d.message, 'Dismiss', { duration: 30000 });
      }
    });
    this.doughnutReady = true;
  }

  bestSellCurrencyChange(input: string) {
    this.doughnutReady = false;
    this.bestSellCurrency(parseInt(input));
  }

  async monthlySales() {
    const obj = [];
    await this.dashService.getSales().toPromise().then(d => {
      if (d.status === 'success') {
        console.log(d);
        if (d.data.length !== 0) {
          d.data.forEach((c, i) => {
            this.barChartLabels.push(c.month);
            obj.push(c.total);
          });
          this.barChartData.push({ data: obj, label: 'Profit' });
        }
      } else {
        this.alert.open(d.message, 'Dismiss', { duration: 30000 });
      }
    });
    this.barChartReady = true;
  }

}
