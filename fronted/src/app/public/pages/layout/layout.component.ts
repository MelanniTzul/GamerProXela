import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterOutlet } from '@angular/router';
import { BussinesService } from '@public/services';
import { AccountStatusService } from '@public/services/account-status.service';

@Component({
  templateUrl: './layout.component.html',
  styles: [],
  standalone: true,
  imports: [RouterOutlet],
})
export class LayoutComponent {
  AccountStatusService = inject(AccountStatusService);
  private bussinesService = inject(BussinesService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
}
