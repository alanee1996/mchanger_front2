import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ForgetPasswordModel } from '../Models/forgetPasswordModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { GenericModel } from '../Models/genericModel';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  public resetForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ForgetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GenericModel<ForgetPasswordModel>, private alert: MatSnackBar, private auth: AuthService
  ) {}

  ngOnInit() {
    this.data.data = new ForgetPasswordModel('', '', '');
    this.resetForm = new FormGroup({
      username: new FormControl(this.data.data.username, [Validators.required]),
      email: new FormControl(this.data.data.email, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(this.data.data.password, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,10}$')
      ])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async reset(event) {
    event.preventDefault();
    if (!this.resetForm.invalid) {
      this.auth.forgetPassword(this.data.data).subscribe(r => {
        this.dialogRef.close(r);
      });
    }
  }
}
