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
import { RoleCRDComponent } from './role/role.crd.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user.list.component';
import { UserCRDComponent } from './user/user.crd.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionDetailComponent } from './transaction/transaction.detail.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PermissionGuard } from './permission.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: RootpageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'withdrawal', component: WithdrawalComponent, canActivate: [PermissionGuard], data: { permissions: ['WITHDRAW_APPROVAL'] } },
      {
        path: 'roles', component: RoleComponent,
        children: [
          { path: '', component: RoleListComponent, canActivate: [PermissionGuard], data: { permissions: ['VIEW_ROLE'] } },
          { path: 'list', component: RoleListComponent, canActivate: [PermissionGuard], data: { permissions: ['VIEW_ROLE'] } },
          {
            path: 'detail/:action', component: RoleCRDComponent,
            canActivate: [PermissionGuard],
            data: { permissions: ['CREATE_ROLE', 'EDIT_ROLE'], either: true }
          },
          { path: '**', component: PageNotFoundComponent}
        ]
      },
      {
        path: 'users', component: UserComponent,
        children: [
          { path: '', component: UserListComponent, canActivate: [PermissionGuard], data: { permissions: ['VIEW_USER'] }},
          { path: 'list', component: UserListComponent, canActivate: [PermissionGuard], data: { permissions: ['VIEW_USER'] } },
          {
            path: 'detail/:action', component: UserCRDComponent,
            canActivate: [PermissionGuard],
            data: {
              permissions: ['CREATE_USER', 'MODIFY_USER'],
              either: true
            }
          },
          { path: '**', component: PageNotFoundComponent}
        ]
      },
      {
        path: 'transaction/list', component: TransactionComponent,
        canActivate: [PermissionGuard],
        data: { permissions: ['VIEW_TRANSACTION'] }
      },
      {
        path: 'transaction/detail/:id', component: TransactionDetailComponent,
        canActivate: [PermissionGuard],
        data: {
          permissions: ['VIEW_TRANSACTION']
        }
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
  RoleComponent, RoleListComponent, RoleCRDComponent, UserListComponent, UserComponent, UserCRDComponent,
  TransactionComponent, TransactionDetailComponent, DashboardComponent
];
