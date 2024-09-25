import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { AuthService } from '../../public/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  //private authService = inject(AuthService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // this.authService.checkAuthStatus().subscribe();

    return next.handle(request);
  }
}
