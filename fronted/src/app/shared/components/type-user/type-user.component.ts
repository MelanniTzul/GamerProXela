import { Component, DestroyRef, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  ModalAlertComponent,
  TitleComponent,
} from '@shared/components';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserCreateModalComponent } from 'src/app/admin';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    ModalAlertComponent,
    ButtonComponent,
    MatDialogModule,
    FormsModule,
  ],
  templateUrl: './type-user.component.html',
})
export class TypeUserComponent implements OnInit {
  public userForm!: FormGroup;
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);
  userType: string = 'checkWeb';

  ngOnInit(): void {}

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TypeUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  modalAction(): void {
    let width: string;

    if (window.innerWidth <= 768) {
      width = '90%';
    } else {
      width = '50%';
    }
    if (this.userType === 'checkAppP') {
      const dialogActionDetail = this.dialog.open(UserCreateModalComponent, {
        width: width,
        data: {
          type: 'Crear',
          data: 'checkApp',
          isparking: '1',
          codes: this.data,
        },
        disableClose: true,
      });
      dialogActionDetail.afterClosed().subscribe(result => {
        this.dialogRef.close(true);
      });
    } else {
      const dialogActionDetail = this.dialog.open(UserCreateModalComponent, {
        width: width,
        data: { type: 'Crear', data: this.userType },
        disableClose: true,
      });
      dialogActionDetail.afterClosed().subscribe(result => {
        this.dialogRef.close(true);
      });
    }
  }
}
