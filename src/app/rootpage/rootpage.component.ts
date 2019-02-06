import { Component, OnInit } from '@angular/core';
import { User } from '../Models/user';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rootpage',
  templateUrl: './rootpage.component.html',
  styleUrls: ['./rootpage.component.css']
})
export class RootpageComponent implements OnInit {

  public userProfile: User = new User();
  public hasError = false;
  public errorMessage;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.isLogin()) {
      this.auth.getUserProfile().subscribe((d) => {
        if (d['status'] === 'failed') {
          this.hasError = true;
          this.errorMessage = d['message'];
        } else {
          this.hasError = false;
          this.errorMessage = null;
          this.userProfile = d['data'];
        }
      });
    } else {
        this.router.navigate(['/']);
    }

  }
}
