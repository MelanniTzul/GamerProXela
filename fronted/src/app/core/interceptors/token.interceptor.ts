import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../../public/services';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const tokenService = inject(TokenService);

  const token = tokenService.getToken()?.toString();
  if (
    req.url.includes('validateLogin') ||
    req.url.includes('login') ||
    req.url.includes('transaction') ||
    req.url.includes('resetPassword')
  ) {
    return next(req);
  }

  if (!token) {
    return next(req);
  }

  const request = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error(error.message));
    })
  );
};
