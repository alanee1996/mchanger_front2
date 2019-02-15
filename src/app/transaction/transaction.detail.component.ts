import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../Services/transaction.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { GenericModel } from '../Models/genericModel';
import { TransactionModel } from '../Models/transactionModel';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction.detail.html',
})
export class TransactionDetailComponent implements OnInit {

  private param: string;
  public model: GenericModel<TransactionModel> = new GenericModel<TransactionModel>();

  constructor(private router: Router, private transactionService: TransactionService,
    private spinner: NgxSpinnerService, private alert: MatSnackBar, private route: ActivatedRoute) {
    this.model.data = new TransactionModel();
    this.param = this.route.snapshot.paramMap.get('id');
    }

    async ngOnInit() {
      await this.transactionService.getTransactionDetail(this.param).toPromise().then(d => {
        this.model = d;
        if (this.model.status === 'failed') {
          this.alert.open(this.model.message, 'Dismiss', { duration: 3000 });
        }
      });
    }
}
