
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
         path: 'ventas',
         loadComponent: () => import('./pages').then(c => c.VentasComponent),
       },
       {
         path: 'cliente',
         loadComponent: () => import('./pages').then(c => c.ClienteComponent),
       },
       {
         path: 'bodega',
         loadComponent: () => import('./pages').then(c => c.BodegaComponent),
       },
       {
         path: 'productos',
         loadComponent: () => import('./pages').then(c => c.ProductosComponent),
       },
       {
         path: 'inventario',
         loadComponent: () => import('./pages').then(c => c.InventarioComponent),
       },
       {
         path: 'inventario',
         loadComponent: () => import('./pages').then(c => c.TarjetaComponent),
       },
       {
         path: 'productosTrasladados',
         loadComponent: () => import('./pages').then(c => c.ProductosTrasladadosComponent),
       },
       {
         path: 'informacionProductos',
         loadComponent: () => import('./pages').then(c => c.InformacionProductosComponent),
       },
       {
         path: 'registroTrabajadores',
         loadComponent: () => import('./pages').then(c => c.RegistrarTrabajadoresComponent),
       },
       {
         path: 'tarjetas',
         loadComponent: () => import('./pages').then(c => c.TarjetasComponent),
       },
       {
         path: '**',
         redirectTo: '/dashboard',
       },
     ],
   },
 ];
