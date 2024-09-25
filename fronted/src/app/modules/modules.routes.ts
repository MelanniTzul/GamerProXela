
 import { Route } from '@angular/router';
 import { importProvidersFrom } from '@angular/core'

 export const ModulesRoutes: Route[] = [
   {
     path: '',
     loadComponent: () => import('./pages').then(c => c.LayoutComponent),
    //  canMatch: [permissionsGuard
     children: [
       {
         path: 'dashboard',
         loadComponent: () => import('./pages').then(c => c.HomeComponent),
       },
       {
         path: 'report',
         loadComponent: () => import('./pages').then(c => c.ReportComponent),
       },
       {
         path: '**',
         redirectTo: '/dashboard',
       },
     ],
   },
 ];
