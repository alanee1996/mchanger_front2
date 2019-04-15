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


  async handleQrCodeResult(resultString: string) {
    this.qrResultString = resultString;
    const audio = new Audio();
    audio.src = 'https://www.soundjay.com/button/beep-07.mp3';
    audio.load();
    audio.play();
    await setTimeout(() => {
      audio.remove();
    }, 1000);
  }

  startCamera() {
    this.isStart = this.isStart ? false : true;
    if (this.isStart) {
      this.currentDevice = this.availableDevices[0];
    } else {
      this.currentDevice = null;
    }
  }

  async scanComplete(result: Result) {
    try {
      const val = JSON.parse(result.toString());
      await this.transactionService.getWithdrawProccess(val.key).toPromise().then(m => {
        console.log(m);
        if (m.status === 'failed') {
          this.wp = new WithdrawProcess();
          this.alert.open(m.message, 'Dismiss', {duration: 3000});
        } else {
          this.wp = m.data;
        }
      });
      // this.wp = JSON.parse(result.toString());
      this.withdraw.amount = this.wp.amount;
      this.withdraw.date = this.wp.date;
      this.withdraw.purpose = this.wp.purpose;
      this.withdraw.walletId = this.wp.walletId;
      this.qrResult = result;
      this.isStart = false;
      this.currentDevice = null;
      this.haveValue = true;
    } catch (ex) {
      this.alert.open('Invalid QR code', 'Dismiss', { duration: 3000 });
    }
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
