import { Component, OnInit } from '@angular/core';
import { RoleService } from '../Services/role.service';
import { Router } from '@angular/router';
import { GenericModel, Pagination } from '../Models/genericModel';
import { Role } from '../Models/role';
import { MatSnackBar, MatPaginator, PageEvent, MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../Services/auth.service';
import { ConfirmDialogModel } from '../Models/ConfirmDialogModel';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './roles.list.html'
})
export class RoleListComponent implements OnInit {

  public model: GenericModel<Array<Role>> = new GenericModel<Array<Role>>();
  public data: Array<Role>;

  constructor(private roleService: RoleService, public auth: AuthService, private router: Router,
    private snackBar: MatSnackBar, private spinner: NgxSpinnerService, public dialog: MatDialog) {
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
    const confirm = new ConfirmDialogModel('Are you sure you want to delete this role ?');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '750px',
      data: confirm
    });

    dialogRef.afterClosed().subscribe((result: ConfirmDialogModel) => {
      if (result !== undefined) {
              // tslint:disable-next-line:max-line-length
        console.log(result);
        if (result.result) {
          this.roleService.deleteRole(id).subscribe(d => {
            if (d.status !== 'failed') {
              this.model = d;
              this.data = this.model.data;
          }
          this.snackBar.open(d.message, 'Dismiss', { duration: 3000 });
        });
        }
      }
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

