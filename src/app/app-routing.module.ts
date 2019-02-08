import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RootpageComponent } from './rootpage/rootpage.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ProfileComponent } from './profile/profile.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { RoleComponent } from './role/role.component';
import { RoleListComponent } from './role/roles.list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: RootpageComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'withdrawal', component: WithdrawalComponent },
      {
        path: 'roles', component: RoleComponent,
        children: [
          { path: '', component: RoleListComponent },
          { path: 'list', component: RoleListComponent },
          { path: '**', component: PageNotFoundComponent}
        ]
    }
    ]
  },
  { path: '**' , component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingCollection = [
  PageNotFoundComponent, LoginComponent, RootpageComponent, SidenavComponent, ProfileComponent, WithdrawalComponent,
  RoleComponent, RoleListComponent
];
