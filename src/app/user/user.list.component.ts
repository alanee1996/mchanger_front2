import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericModel, Pagination } from '../Models/genericModel';
import { MatSnackBar, MatPaginator, PageEvent } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserDetail } from '../Models/user';
import { UserService } from '../Services/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user.list.html'
})
export class UserListComponent implements OnInit {

  public model: GenericModel<Array<UserDetail>> = new GenericModel<Array<UserDetail>>();
  public data: Array<UserDetail>;

  constructor(private userService: UserService, private router: Router,
    private snackBar: MatSnackBar, private spinner: NgxSpinnerService) {
    }

  async ngOnInit() {
    this.spinner.show();
    await this.userService.getUserList().toPromise().then((d) => {
      this.model = d;
      if (this.model.status === 'failed') {
        this.snackBar.open(this.model.message, 'Dismiss' , { duration: 3000 });
      }
    });
    this.data = this.model.data;
    this.spinner.hide();
  }

  search(searchIn: HTMLInputElement) {
    this.userService.search(searchIn.value).subscribe(d => {
      this.model = d;
      if (this.model.status === 'failed') {
        this.snackBar.open(this.model.message, 'Dismiss', {
          duration: 4000
        });
      } else {
        this.data = this.model.data;
      }
    });
  }

  pageEvent(event: PageEvent, searchIn: HTMLInputElement) {
    if (searchIn.value) {
      this.userService.search(searchIn.value, event.pageIndex + 1).subscribe(d => {
        this.model = d;
        if (this.model.status === 'failed') {
          this.snackBar.open(this.model.message, 'Dismiss', {
            duration: 4000
          });
        } else {
          this.data = this.model.data;
        }
      });
    } else {
      this.userService.getUserList(event.pageIndex + 1).subscribe(d => {
        this.model = d;
        if (this.model.status === 'failed') {
          this.snackBar.open(this.model.message, 'Dismiss', {
            duration: 4000
          });
        } else {
          this.data = this.model.data;
        }
      });
    }
  }
}

