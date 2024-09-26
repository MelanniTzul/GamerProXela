import { Cookies } from 'typescript-cookie';
import { Component, Input, inject } from '@angular/core';

// NgRx
import { Store } from '@ngrx/store';
// import {
//   selectLogo,
//   selectLogoError,
//   selectIsLoadingLogo,
// } from '@store/selectors/logo.selectors';

// import {
//   selectTheme,
//   selectThemeError,
//   selectIsLoadingTheme,
// } from '@store/selectors/theme.selectors';

// import { NavbarService } from '../../services';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgStyle, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styles: [
    `
      .logo {
        height: 40px;
        width: auto;
      }
    `,
  ],
  standalone: true,
  imports: [
    MatToolbarModule,
    NgStyle,
    MatButtonModule,
    NgIf,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    RouterLink,
    MatListModule,
  ],
})
export class HeaderComponent {
  @Input()
  themePrimary?: string = '';

  @Input()
  themeItemNavbar?: string = '';

  @Input()
  title?: string = '';

  @Input()
  name:
    | string
    | {
        [property: string]: string;
      }
    | undefined;

  @Input()
  isMenuOpened!: boolean;

  private navbarService = inject(NavbarService);
  private readonly store = inject(Store);

  // public readonly isLoading = this.store.selectSignal(selectIsLoadingLogo);
  // public readonly logo = this.store.selectSignal(selectLogo);
  // public readonly error = this.store.selectSignal(selectLogoError);


  // public readonly theme = this.store.selectSignal(selectTheme);
  // public readonly errorTheme = this.store.selectSignal(selectThemeError);
  cookieRole = Cookies.get('role');

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;

    this.navbarService.changeShow(this.isMenuOpened);
  }
}
