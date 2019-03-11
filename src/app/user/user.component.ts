import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public navlink = [
    { path: 'list', label: 'User List', permission: 'VIEW_USER' },
    { path: 'detail/create', label: 'User Creation', permission: 'CREATE_USER' }
  ];

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
