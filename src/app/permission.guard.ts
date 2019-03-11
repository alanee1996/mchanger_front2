import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../app/Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (next.data.either) {
      if (this.authService.havePermissionsEither(next.data.permissions)) {
        return true;
      } else {
        this.authService.router.navigate(['/accessdenied', { returnUrl: state.url }]);
        return false;
      }
      return true;
    } else {
      if (this.authService.havePermissions(next.data.permissions)) {
        return true;
      } else {
        this.authService.router.navigate(['/accessdenied', { returnUrl: state.url }]);
        return false;
      }
    }
  }
}
