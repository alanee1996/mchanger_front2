import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { AppRoutingModule, RoutingCollection } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DesignModuleModule } from './design-module/design-module.module';
import { AuthService } from './Services/auth.service';
import { ProfileImgDialogComponent } from './profile-img-dialog/profile-img-dialog.component';
import { UserService } from './Services/user-service.service';
import { TransactionService } from './Services/transaction.service';
import { RoleService } from './Services/role.service';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './Services/dashboard.service';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { PermissionGuard } from './permission.guard';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ForgetPasswordComponent,
    PageNotFoundComponent,
    RoutingCollection,
    ProfileImgDialogComponent,
    DashboardComponent,
    ConfirmDialogComponent,
  ],
  entryComponents: [ProfileImgDialogComponent, ConfirmDialogComponent, ForgetPasswordComponent],
  imports: [
    BrowserModule,
    DesignModuleModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    ZXingScannerModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [AuthService, , AuthGuard, PermissionGuard , UserService, TransactionService, RoleService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
