import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../public/services';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const routeService = inject(Router);
  // const token = tokenService.getToken();
  const isValidToken = tokenService.isValidToken();
  if (isValidToken) {
    routeService.navigateByUrl('/admin/dashboard');
    return false;
  }
  return true;
};
