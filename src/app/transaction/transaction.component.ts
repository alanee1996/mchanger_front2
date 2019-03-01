import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../Services/transaction.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GenericModel } from '../Models/genericModel';
import { TransactionModel } from '../Models/transactionModel';
import { MatSnackBar, PageEvent } from '@angular/material';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  public model: GenericModel<Array<TransactionModel>> = new GenericModel<Array<TransactionModel>>();
  public data: Array<TransactionModel>;

  constructor(private transactionService: TransactionService, private router: Router,
    private spinner: NgxSpinnerService, private alert: MatSnackBar) { }

  async ngOnInit() {
    await this.transactionService.getTransactionList().toPromise().then(d => {
      this.model = d;
      if (this.model.status === 'failed') {
        this.alert.open(this.model.message, 'Dismiss', { duration: 3000 });
      }
    });
    this.data = this.model.data;
  }


  search(searchIn: HTMLInputElement) {
    this.transactionService.search(searchIn.value).toPromise().then((d) => {
      this.model = d;
      if (this.model.status === 'failed') {
        this.alert.open(this.model.message, 'Dismiss' , { duration: 3000 });
      } else {
        this.data = this.model.data;
      }
    });
  }

  pageEvent(event: PageEvent, searchIn: HTMLInputElement) {
    if (searchIn.value) {
      this.transactionService.search(searchIn.value, event.pageIndex + 1).subscribe(d => {
        this.model = d;
        if (this.model.status === 'failed') {
          this.alert.open(this.model.message, 'Dismiss', {
            duration: 4000
          });
        } else {
          this.data = this.model.data;
        }
      });
    } else {
      console.log(event.pageIndex + 1);
      this.transactionService.getTransactionList(event.pageIndex + 1).subscribe(d => {
        this.model = d;
        if (this.model.status === 'failed') {
          this.alert.open(this.model.message, 'Dismiss', {
            duration: 4000
          });
        } else {
          this.data = this.model.data;
        }
      });
    }
  }
}
