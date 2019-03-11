import { Component, OnInit } from '@angular/core';
import { RoleService } from '../Services/role.service';
import { Router } from '@angular/router';
import { GenericModel, Pagination } from '../Models/genericModel';
import { Role } from '../Models/role';
import { MatSnackBar, MatPaginator, PageEvent } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './roles.list.html'
})
export class RoleListComponent implements OnInit {

  public model: GenericModel<Array<Role>> = new GenericModel<Array<Role>>();
  public data: Array<Role>;

  constructor(private roleService: RoleService,public auth: AuthService, private router: Router,
    private snackBar: MatSnackBar, private spinner: NgxSpinnerService) {
    }

  async ngOnInit() {
    this.spinner.show();
    await this.roleService.getAllRole(1).toPromise().then((d) => {
      this.model = d;
      if (this.model.status === 'failed') {
        this.snackBar.open(this.model.message, 'Dismiss' , { duration: 3000 });
      }
    });
    this.data = this.model.data;
    this.spinner.hide();
  }

  delete(id) {
    this.roleService.deleteRole(id).subscribe(d => {
      this.model = d;
      if (this.model.status !== 'failed') {
        this.data = this.model.data;
       }
      this.snackBar.open(this.model.message, 'Dismiss', { duration: 3000 });
    });
  }

  search(searchIn: HTMLInputElement) {
    this.roleService.search(searchIn.value).toPromise().then((d) => {
      this.model = d;
      if (this.model.status === 'failed') {
        this.snackBar.open(this.model.message, 'Dismiss' , { duration: 3000 });
      } else {
        this.data = this.model.data;
      }
    });
  }

  pageEvent(event: PageEvent, searchIn: HTMLInputElement) {
    if (searchIn.value) {
      this.roleService.search(searchIn.value, event.pageIndex + 1).subscribe(d => {
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
      this.roleService.getAllRole(event.pageIndex + 1).subscribe(d => {
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

