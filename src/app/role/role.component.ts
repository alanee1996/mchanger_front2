import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  public navlink = [
    { path: 'list', label: 'Role List' },
    { path: 'create', label: 'Role Creation' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
