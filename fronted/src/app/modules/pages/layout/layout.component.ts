import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

// NgRx
import { Store } from '@ngrx/store';


import { Cookies } from 'typescript-cookie';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { ModalIdleComponent } from "../../../shared/components/modal-idle/modal-idle/modal-idle.component";

@Component({
  templateUrl: './layout.component.html',
  styles: [
    `
      .layout-sidebar {
        height: calc(100vh - 64px);
      }

      .layout-content {
        background-color: #f6f7ff;
        height: calc(100vh - 64px);
      }

      .footer_container {
        background-color: #4c4848;
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatSidenavModule,
    SidebarComponent,
    RouterOutlet,
    HeaderComponent,
    ModalIdleComponent
],
})
export class LayoutComponent implements  OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  public isDesktop = true;
  public username: string | { [property: string]: string } | undefined;
  public opened = true;
  public mobileQuery!: MediaQueryList;
  private mobileQueryListener!: () => void;

  private changeDetectorRef = inject(ChangeDetectorRef);
  private media = inject(MediaMatcher);
  private readonly store = inject(Store);




  private router = inject(Router);
  private dialog = inject(MatDialog);
  bandera = signal(true);
  banderaRecibida: boolean = false;
  public isShowSidebar = computed(()=>{return true});

  constructor() {
    this.mobileQuery = this.media.matchMedia('(max-width: 1024px)');
    this.mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);

  }



  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);

    this.sidenav.close();
  }

}
