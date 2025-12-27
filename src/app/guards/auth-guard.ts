import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {


    const token = this.authService.getToken();
    if (!token) {
      this.router.navigateByUrl('/login');
      return false;
    }


    const requiredRoles = route.data['roles'] as string[] | undefined;

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const userRoles = this.authService.getRoles();

    const hasRole = requiredRoles.some(role =>
      userRoles.includes(role)
    );

    if (hasRole) {
      return true;
    }


    this.router.navigateByUrl('/not-authorized');
    return false;
  }
}
