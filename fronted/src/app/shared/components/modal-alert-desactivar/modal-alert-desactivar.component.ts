import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../button';
@Component({
  selector: 'app-modal-alert-desactivar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ButtonComponent,
  ],
  template: `<div class="max-w-24rem">
  <h1 mat-dialog-title class="flex flex-column align-items-center justify-content-center">
    <div>
      <mat-icon class="w-12 h-3rem" [style.fontSize.px]="45" color="warn">error_outline</mat-icon>
    </div>
    <div class="flex flex-wrap justify-content-center align-items-center text-center">
      <p>
        ¿Esta seguro que desea suspender a <strong>{{ data }}</strong>?
      </p>
    </div>
  </h1>
  <div mat-dialog-actions class="flex justify-content-center align-items-center gap-3 mb-3">
    <shared-button [icon]="'clear'" [typeBtn]="'button'" [color]="'accent'" (click)="action(1)">
      Cancelar
    </shared-button>
    <shared-button [icon]="'perm_identity'" [typeBtn]="'button'" [color]="'warn'" (click)="action(0)">
      Suspender
    </shared-button>
  </div>
</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAlertDesactivarComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalAlertDesactivarComponent>
  ) {
    this.dialogRef.disableClose = true;
  }
  action(type: number) {
    if (type === 0) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }
}
