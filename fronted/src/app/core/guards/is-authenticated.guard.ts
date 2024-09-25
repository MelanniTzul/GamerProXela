import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../public/services/token.service';
import { AccountStatusService, BussinesService } from '@public/services';

export const isAuthenticatedGuard: CanActivateFn = async (route, state) => {
  const tokenService = inject(TokenService);
  const routeService = inject(Router);
  const accountStatusService = inject(AccountStatusService);
  const businessService = inject(BussinesService);

  const businessId = await businessService.getBussinesId();
  const isValidToken = tokenService.isValidToken();

  console.log(businessId);

  if (businessId) {
    accountStatusService.getStatusAccountById(businessId);
  }

  // const token = tokenService.getToken();
  const status = accountStatusService.getAccountStatus();

  if (!isValidToken) {
    routeService.navigateByUrl('/auth');
    return false;
  }

  if (status === 'suspendido') {
    routeService.navigateByUrl('/suspend');
    return false;
  }

  return true;
};
