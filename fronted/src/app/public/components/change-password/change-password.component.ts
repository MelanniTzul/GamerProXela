import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, inject, DestroyRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastAlertService } from '@core/services';
import { AuthService } from '../../services/auth.service';
import { BussinesService } from '../../services/bussines.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { JsonPipe, NgIf } from '@angular/common';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { IsEqualFieldValidator } from '@shared/validators';
import { MatListModule } from '@angular/material/list';
import { Cookies } from 'typescript-cookie';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: [],
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ButtonComponent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    MatListModule,
    JsonPipe,
  ],
})
export class ChangePasswordComponent {
  hide = true;
  hideConfirm = true;
  loginForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private bussinesService = inject(BussinesService);
  private toasService = inject(ToastAlertService);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);
  #isEqualFieldValidator = inject(IsEqualFieldValidator);

  constructor() {
    this.buildForm();
  }

  forgotPassword(action?: any) {
    const ancho = this.obtenerAnchoDePantalla();
    const width = ancho >= 768 ? '30%' : '100%';

    const dialogActionDetail = this.dialog.open(ForgotPasswordComponent, {
      width: width,
      data: action,
    });

    dialogActionDetail
      .beforeClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          //
        }
      });
  }
  obtenerAnchoDePantalla(): number {
    let ancho = window.innerWidth;
    return ancho;
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group(
      {
        codigo: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!])[A-Za-z\\d@#$%^&+=!]{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [
          this.#isEqualFieldValidator.validate('password', 'confirmPassword'),
        ],
      }
    );
  }
  login() {
    if (this.loginForm.valid) {
      this.authService
        .sendChangePassword(this.loginForm.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: resp => {
            if (resp.code === 10000) {
              this.toasService.sucess(resp.detail);
              Cookies.set('firstLogin', false);
              this.dialog.closeAll();
            } else {
              this.toasService.error(resp.detail);
            }
          },
        });
    }
  }
}
