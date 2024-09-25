import {  LoginPageComponent } from './pages/login-page/login-page.component';
import { Route } from '@angular/router';
// import { isNotAuthenticatedGuard } from '@core/guards';
import { LayoutComponent } from './pages/layout/layout.component';

export const PublicRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./pages').then(c => c.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages').then(c => c.LoginPageComponent),
        // canActivate: [isNotAuthenticatedGuard],
      },
      // {
      //   path: 'sign-out',
      //   loadComponent: () =>
      //     import('./pages').then(c => c.SignOutPageComponent),
      // },
      { path: '**', redirectTo: '' },
    ],
  },
];
