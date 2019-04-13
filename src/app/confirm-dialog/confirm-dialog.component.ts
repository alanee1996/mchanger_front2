import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmDialogModel } from '../Models/ConfirmDialogModel';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  public inProgress = false;
  public url: any = null;

  constructor( public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {
     }

     onNoClick(): void {
      this.dialogRef.close();
     }

  onCancel() {
    this.data.result = false;
    this.dialogRef.close(this.data);
  }

  onConfirm() {
    this.data.result = true;
    this.dialogRef.close(this.data);
  }
}
