import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Inject, inject, DestroyRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { ToastAlertService } from '@core/services';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { TitleComponent } from '@shared/components/title/title.component';
import { MatCardModule } from '@angular/material/card';
import { CountryService } from '@public/services';
@Component({
  selector: 'app-modal-producto',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    TitleComponent,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogContent,
    InputComponent,
    MatDialogActions,
    ButtonComponent,
    MatDialogClose,
  ],
  templateUrl: './modalProducto.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalProductoComponent {
    formBuilder = inject(FormBuilder);
  public operation: string = '';
  public countryForm!: FormGroup;
  private countryService = inject(CountryService);
  private destroyRef = inject(DestroyRef);
  private dialogRef = inject(MatDialogRef<ModalProductoComponent>);
  private alertServide = inject(ToastAlertService);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.buildForm();
  }

  get id_country() {
    return this.countryForm.get('id');
  }

  private storeCountry() {
    if (this.countryForm.valid) {
      this.countryService
        .storeCountry(this.countryForm.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: resp => {
            if (resp.code === 10000) {
              this.dialogRef.close(true);
              this.alertServide.sucess('País creado');
            } else {
              this.alertServide.error(resp.detail);
            }
          },
        });
    }
  }

  private editCountry() {
    if (this.countryForm.valid) {
      this.countryService
        .updateCountry(
          this.countryForm.value,
          Number(this.data.action?.countryid)
        )
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: resp => {
            if (resp.code === 10000) {
              this.dialogRef.close(true);
              this.alertServide.sucess('País actualizado');
            } else {
              this.alertServide.error(resp.detail);
            }
          },
        });
    }
  }

  submit() {
    if (this.countryForm.controls['id'].value == 0) {
      this.storeCountry();
    } else {
      this.editCountry();
    }
  }

  onChangeInput(input: HTMLInputElement) {
    if (input.valueAsNumber < 0) {
      input.valueAsNumber = 0;
    }
  }

  clearForm() {
    this.buildForm();
  }

  private buildForm() {
    if (this.data.action?.countryid) {
      this.countryForm = this.formBuilder.group({
        id: [this.data.action?.id],
        name: [
          this.data.action?.name,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\\s]+$'),
          ],
        ],
        code: [
          this.data.action?.code,
          [Validators.required, Validators.maxLength(3), Validators.min(0)],
        ],
      });
    } else {
      this.countryForm = this.formBuilder.group({
        id: ['0'],
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\\s]+$'),
          ],
        ],
        code: [
          '',
          [Validators.required, Validators.maxLength(3), Validators.min(0)],
        ],
      });
    }
  }
 }
