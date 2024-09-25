import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '@public/services';
import { ButtonComponent } from '@shared/components/button';

@Component({
  selector: 'app-modal-token',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink, MatDialogActions],
  templateUrl: './modal-token.component.html',
  styleUrl: './modal-token.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalTokenComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ModalTokenComponent>,
    private tokenService: TokenService
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close('Cerrar');
    }, 299400);
  }
  Refresh() {
    this.dialogRef.close('Refresh');
  }
  Cerrar() {
    this.dialogRef.close('Cerrar');
  }
}
