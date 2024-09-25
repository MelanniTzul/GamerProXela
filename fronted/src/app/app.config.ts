import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { StoreModule } from '@ngrx/store';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  AuthInterceptor,
  spinnerInterceptor,
  tokenInterceptor,
} from '@core/interceptors';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withHashLocation,
  withComponentInputBinding,
} from '@angular/router';
import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '@environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
    importProvidersFrom(
      BrowserModule,
      MatNativeDateModule,
      StoreModule.forRoot()
    ),
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-ES',
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideHttpClient(withInterceptors([spinnerInterceptor])),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),

    provideAnimationsAsync(), provideAnimationsAsync(),
  ],
};
