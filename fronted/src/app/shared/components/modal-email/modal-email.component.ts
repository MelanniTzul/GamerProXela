import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button';

@Component({
  selector: 'shared-modal-email',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, ButtonComponent],
  templateUrl: './modal-email.component.html',
})
export class ModalEmailComponent {
  public message = signal('');
  public button = signal('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalEmailComponent>
  ) {
    this.dialogRef.disableClose = true;
    switch (this.data.template) {
      case 'Mora':
        this.message.set(
          `¿Esta seguro que desea notificar mora a ${data.name}?`
        );
        this.button.set('Enviar')
        break;
      case 'Suspensión':
        this.message.set(`¿Esta seguro que desea suspender a ${data.name}?`);
        this.button.set('Enviar')
        break;
      case 'Reactivación':
        this.message.set(`¿Esta seguro que desea reactivar a ${data.name}?`);
        this.button.set('Reactivar')
        break;
      default:
        break;
    }
  }

  action(type: number) {
    if (type === 0) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false);
    }
  }
}
