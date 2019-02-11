import { Component, OnInit } from '@angular/core';
import { RoleService } from '../Services/role.service';
import { Router } from '@angular/router';
import { GenericModel, Pagination } from '../Models/genericModel';
import { Role } from '../Models/role';
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

  delete(id) {

  }

  search(searchIn: HTMLInputElement) {

  }

  pageEvent(event: PageEvent, searchIn: HTMLInputElement) {

  }
}

