import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../Services/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GenericModel } from '../Models/genericModel';
import { Role } from '../Models/role';
import { MatSnackBar, MatTab, MatTableDataSource, MatPaginator } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-role-crd',
  templateUrl: './role.crd.html'
})
export class RoleCRDComponent implements OnInit {

  public message: string;

  constructor(private roleService: RoleService, private router: Router,
    private snackBar: MatSnackBar, private spinner: NgxSpinnerService, private activeRoute: ActivatedRoute) { }

  async ngOnInit() {
    const action = this.activeRoute.snapshot.paramMap.get('action');
    if (action === 'create' || action === 'update') {
      this.spinner.show();
      setTimeout(() => {
         this.spinner.hide();
      }, 3000);
    } else {
      this.message = 'Invalid action detected';
    }
  }
}

