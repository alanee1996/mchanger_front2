import { Component, OnInit } from '@angular/core';
import { RoleService } from '../Services/role.service';
import { Router } from '@angular/router';
import { GenericModel } from '../Models/genericModel';
import { Role } from '../Models/role';
import { MatSnackBar, MatTab, MatTableDataSource, MatPaginator } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaginatorComponent } from '../paginator/paginator.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './roles.list.html'
})
export class RoleListComponent implements OnInit {


  constructor(private roleService: RoleService, private router: Router,
    private snackBar: MatSnackBar, private spinner: NgxSpinnerService) {
    }

  public model: GenericModel<Array<Role>>;
  public data: Array<Role>;

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

  test() {
    console.log('function call');
  }
}

