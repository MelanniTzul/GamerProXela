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
import { ValidationComponent } from '../validation/validation.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
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
    ValidationComponent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
  ],
})
export class ForgotPasswordComponent {
  hide = true;
  loginForm!: FormGroup;
  validation: boolean = false;
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private bussinesService = inject(BussinesService);
  private toasService = inject(ToastAlertService);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);
  constructor() {
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  obtenerAnchoDePantalla(): number {
    let ancho = window.innerWidth;
    return ancho;
  }
  forgotPassword(action?: any) {
    const ancho = this.obtenerAnchoDePantalla();
    const width = ancho >= 768 ? '30%' : '100%';

    const dialogActionDetail = this.dialog.open(ChangePasswordComponent, {
      width: width,
      data: action,
      disableClose: true,
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
  login() {
    if (this.loginForm.valid) {
      this.authService
        .sendResetPassword(this.loginForm.value.email)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: resp => {
            if (resp.code === 10000) {
              this.forgotPassword();
            } else {
              this.toasService.error(resp.detail);
            }
          },
        });
    }
  }
  backToLogin(validation: boolean) {
    this.validation = validation;
  }
}
