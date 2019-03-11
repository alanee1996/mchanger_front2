import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  public navlink = [
    { path: 'list', label: 'Role List' , permission: 'VIEW_ROLE'},
    { path: 'detail/create', label: 'Role Creation', permission: 'CREATE_ROLE' }
  ];

  constructor(public auth: AuthService) {
   }

  ngOnInit() {

  }

}
