import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Result } from '@zxing/library';
import { WithdrawProcess, Withdrawal } from '../Models/Withdrawal';
import { Router } from '@angular/router';
import { TransactionService } from '../Services/transaction.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit {

  @ViewChild('scanner')
  public scanner: ZXingScannerComponent;
  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  qrResult: Result;
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  isStart = false;
  public withdraw: Withdrawal = new Withdrawal();
  public wp: WithdrawProcess = new WithdrawProcess();
  public haveValue = false;

  constructor(private router: Router, private transactionService: TransactionService, private alert: MatSnackBar) {
  }

  async ngOnInit() {
    await this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;
    });
  }


  handleQrCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.currentDevice = null;
  }

  startCamera() {
    this.isStart = this.isStart ? false : true;
    if (this.isStart) {
      this.currentDevice = this.availableDevices[0];
    } else {
      this.currentDevice = null;
    }
  }

  scanComplete(result: Result) {
    this.wp = JSON.parse(result.toString());
    this.withdraw.amount = this.wp.amount;
    this.withdraw.date = this.wp.date;
    this.withdraw.purpose = this.wp.purpose;
    this.withdraw.walletId = this.wp.walletId;
    this.qrResult = result;
    this.isStart = false;
    this.currentDevice = null;
    this.haveValue = true;
  }

  async approve(event) {
    event.preventDefault();
    await this.transactionService.withdraw(this.withdraw).toPromise().then(d => {
      if (d.status === 'success') {
        setTimeout(() => {
          this.router.navigate(['dashboard/transaction/detail/', d.data.id ]);
        }, 4000);
        this.alert.open(d.message + '. You can take the real currency to the customer', 'Dismiss', {
          duration: 3000
        });
      } else {
        this.alert.open(d.message, 'Dismiss', {
          duration: 3000
        });
      }
    });
  }
}
