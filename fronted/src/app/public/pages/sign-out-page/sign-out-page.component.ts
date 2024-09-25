import { Component, OnInit, inject } from '@angular/core';
// import { AuthService } from '../../services/auth.service';


@Component({
  templateUrl: './sign-out-page.component.html',
  styles: [
    `
      .container {
        background: var(--primary-color);
      }
    `,
  ],
  standalone: true,
})
export class SignOutPageComponent implements OnInit {
  // private authService = inject(AuthService);
  // private store = inject(Store);
  ngOnInit(): void {
    // setTimeout(() => {
    //   this.authService.logout();
    //   this.store.dispatch(LogoActions.clearLogo());
    //   this.store.dispatch(ThemeActions.clearTheme());
    // }, 1000);
  }
}
