import {
  Component,
  DestroyRef,
  Input,
  computed,
  inject,
  signal,
} from '@angular/core';

import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Menu } from '@core/models';
import { Cookies } from 'typescript-cookie';


import { MatIconModule } from '@angular/material/icon';
import { NgStyle, NgIf, NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
      .active-link {
        background-color: rgba(0, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [
    MatListModule,
    RouterLink,
    RouterLinkActive,
    NgStyle,
    MatIconModule,
    NgIf,
    NgFor,
  ],
})
export class SidebarComponent {
  //*obtener el role por medio de las cookies
  role = signal(Cookies.get('role'));
  private readonly store = inject(Store);



  @Input()
  public baseColor?: string;

  @Input()
  public accentColor?: string;

  private business: { [p: string]: string } | undefined | string = '';

  private destroyRef = inject(DestroyRef);

  private actions = computed(() => {});

  constructor() {
    this.loadActions();
  }
//     //*CAJERO
public general: Menu[] = [
  {
    label: 'Ventas',
    route: '/home/ventas',
    icon: 'shopping_cart', // Icono relacionado con ventas
    show: true,
  },
  {
    label: 'Clientes',
    route: '/home/cliente',
    icon: 'people', // Icono relacionado con clientes
    show: true,
  },
];

//*BODEGA
public groups: Menu[] = [
  {
    label: 'Registro de productos',
    route: '/home/productos',
    icon: 'inventory', // Icono relacionado con la bodega y productos
    show: true,
  },
];

//*INVENTARIO
public reports: Menu[] = [
  {
    label: 'Transacción de productos',
    route: '/home/productosTrasladados',
    icon: 'swap_horiz', // Icono relacionado con transacciones o intercambios
    show: true,
  },
  {
    label: 'Informacion de productos',
    route: '/home/informacionProductos',
    icon: 'info', // Icono relacionado con información de productos
    show: true,
  },
];

public tools: Menu[] = [
  {
    label: 'Reportes',
    route: '/home/report',
    icon: 'bar_chart', // Icono relacionado con reportes o estadísticas
    show: true,
  },
  {
    label: 'Registrar trabajadores',
    route: '/home/registroTrabajadores',
    icon: 'person_add', // Icono relacionado con la asignación de roles o registro
    show: true,
  },
  {
    label: 'Tarjetas',
    route: '/home/tarjetas',
    icon: 'credit_card', // Icono relacionado con tarjetas
    show: true,
  },
];


  public isOpenGeneralElements = computed(() => this._isOpenGeneralElements());
  private _isOpenGeneralElements = signal(false);

  public openGeneralElements() {
    this._isOpenGeneralElements.set(!this._isOpenGeneralElements());
  }

  public isOpenGeneral(): boolean {
    return this.general.some(item => item.show);
  }

  public isOpenNotificationsElements = computed(() =>
    this._isOpenNotificationsElements()
  );
  private _isOpenNotificationsElements = signal(false);

  public openNotificationsElements() {
    this._isOpenNotificationsElements.set(!this._isOpenNotificationsElements());
  }

  public isOpenReservationsElements = computed(() =>
    this._isOpenReservationsElements()
  );
  private _isOpenReservationsElements = signal(false);

  public openReservationsElements() {
    this._isOpenReservationsElements.set(!this._isOpenReservationsElements());
  }

  // public isOpenReservations(): boolean {
  //   return this.reservations.some(item => item.show);
  // }

  public isOpenGroupsElements = computed(() => this._isOpenGroupsElements());
  private _isOpenGroupsElements = signal(false);

  public openGroupsElements() {
    this._isOpenGroupsElements.set(!this._isOpenGroupsElements());
  }

  public isOpenGroups(): boolean {
    return this.groups.some(item => item.show);
  }

  public isOpenReportsElements = computed(() => this._isOpenReportsElements());
  private _isOpenReportsElements = signal(false);

  public openReportsElements() {
    this._isOpenReportsElements.set(!this._isOpenReportsElements());
  }

  public isOpenReports(): boolean {
    return this.reports.some(item => item.show);
  }

  public isOpenToolsElements = computed(() => this._isOpenToolsElements());
  private _isOpenToolsElements = signal(false);

  public openToolsElements() {
    this._isOpenToolsElements.set(!this._isOpenToolsElements());
  }

  public isOpenTools(): boolean {
    return this.tools.some(item => item.show);
  }

  private loadActions() {
    // this.workerRoleService
    //   .getRolActions()
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe(() => {
    //     localStorage.setItem('permissions', JSON.stringify(this.actions()));
    //     if (Cookies.get('role') !== 'SYSADMIN') {
    //       this.reports[4].show = false;
    //       //this.general[0].show = false;
    //       for (const item of this.actions()) {
    //         if (item.actionName === 'empresa') {
    //           this.general[0].show = item.show;
    //         } else if (item.actionName === 'edificio') {
    //           if (Cookies.get('role') !== 'ACCESOS') {
    //             this.business = Cookies.get('bussinesId');
    //             this.general[1].route = `/admin/general/buildings/${this.business!.toString()}`;
    //           }
    //           this.general[1].show = item.show;
    //         } else if (item.actionName === 'tema') {
    //           this.general[3].show = item.show;
    //         } else if (item.actionName === 'tipo_puesto_trabajo') {
    //           this.general[2].show = item.show;
    //         } else if (item.actionName === 'crear_reserva') {
    //           this.reservations[0].show = item.show;
    //         } else if (item.actionName === 'ver_reserva') {
    //           this.reservations[1].show = item.show;
    //         } else if (item.actionName === 'ver_parqueo') {
    //           this.reservations[2].show = item.show;
    //         } else if (item.actionName === 'grupo_puesto_trabajo') {
    //           this.groups[0].show = item.show;
    //         } else if (item.actionName === 'grupo_usuario') {
    //           this.groups[1].show = item.show;
    //         } else if (item.actionName === 'gestion_grupo') {
    //           this.groups[2].show = item.show;
    //         } else if (item.actionName === 'reporte_lugares') {
    //           this.reports[1].show = item.show;
    //         } else if (item.actionName === 'reporte_horarios') {
    //           this.reports[2].show = item.show;
    //         } else if (item.actionName === 'reporte_reservas') {
    //           this.reports[3].show = item.show;
    //         } else if (item.actionName === 'usuario') {
    //           this.tools[0].show = item.show;
    //         } else if (item.actionName === 'asignar_rol') {
    //           this.tools[1].show = item.show;
    //         } else if (item.actionName === 'editor') {
    //           this.tools[2].show = item.show;
    //         } else if (item.actionName === 'parametro') {
    //           this.tools[3].show = item.show;
    //         } else if (item.actionName === 'asignar_accion') {
    //           this.tools[4].show = item.show;
    //         } else if (item.actionName === 'dashboard') {
    //           this.reports[0].show = item.show;
    //         }
    //       }
    //     }
    //   });
  }
}
