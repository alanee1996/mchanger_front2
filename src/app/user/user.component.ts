import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public navlink = [
    { path: 'list', label: 'User List' },
    { path: 'detail/create', label: 'User Creation' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
