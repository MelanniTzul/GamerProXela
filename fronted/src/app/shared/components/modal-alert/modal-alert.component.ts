import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../button';
@Component({
  selector: 'shared-modal-alert',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ButtonComponent,
  ],
  templateUrl: './modal-alert.component.html',
})
export class ModalAlertComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalAlertComponent>
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
