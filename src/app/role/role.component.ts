import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  public navlink = [
    { path: 'list', label: 'Role List' },
    { path: 'detail/create', label: 'Role Creation' }
  ];

  constructor() {
   }

  ngOnInit() {

  }

}
