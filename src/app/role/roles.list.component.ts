import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../Services/role.service';
import { Router } from '@angular/router';
import { GenericModel } from '../Models/genericModel';
import { Role } from '../Models/role';
import { MatSnackBar, MatTab, MatTableDataSource, MatPaginator } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-role-list',
  templateUrl: './roles.list.html'
})
export class RoleListComponent implements OnInit {

  constructor(private roleService: RoleService, private router: Router,
    private snackBar: MatSnackBar, private spinner: NgxSpinnerService) { }

  public model: GenericModel<Array<Role>>;
  public data: Array<Role>;

  async ngOnInit() {
    this.spinner.show();
    await this.roleService.getAllRole(1).toPromise().then((d) => {
      this.model = d;
      if (this.model.status === 'failed') {
        this.snackBar.open(this.model.message, 'Dismiss');
      }
    });
    this.data = this.model.data;
    this.spinner.hide();
  }
}

