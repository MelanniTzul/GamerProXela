import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '@shared/components/button';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, RouterLink, MatDialogActions],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    private router: Router,
  ) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close('Cerrar');
    }, 19990);
  }

  Refresh() {
    this.dialogRef.close('Refresh');
  }
  Cerrar() {
    this.dialogRef.close('Cerrar');
  }
}
