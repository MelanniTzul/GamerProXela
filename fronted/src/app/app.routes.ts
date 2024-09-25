import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core';

export const routes: Routes = [
  {
    path: 'public',
    loadChildren: () =>
      import('src/app/public/public.routes').then(m => m.PublicRoutes),
  },
  // {
  //   path: 'admin',
  //   // canActivate: [isAuthenticatedGuard],
  //   loadChildren: () =>
  //     import('src/app/admin/admin.routes').then(m => m.AdminRoutes),
  // },
  {
    path: '404',
    loadComponent: () =>
      import('@shared/pages').then(c => c.NotFoundPageComponent),
  },
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'public',
  },
];
