import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const RoleGuard = (requiredRole: string): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const roles = authService.getRoles();

    if (roles.includes(requiredRole)) {
      return true;
    }

    router.navigateByUrl('/not-authorized');
    return false;
  };
};
