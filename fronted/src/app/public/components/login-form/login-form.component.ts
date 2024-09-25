import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, inject, DestroyRef, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastAlertService } from '@core/services';
import { AuthService } from '../../services/auth.service';
import { Cookies } from 'typescript-cookie';
import { BussinesService } from '../../services/bussines.service';
import { ValidationComponent } from '../validation/validation.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { GeneralResponse } from '@core/models';
import { Observable } from 'rxjs';
import { SessionActions } from '@store/actions';
import { Store } from '@ngrx/store';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
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
    MatCardModule,
    MatDivider,
    NgOptimizedImage,
    MatDialogModule,
  ],
})
export class LoginFormComponent {
  version = signal('v1.3.0');

  hide = true;
  loginForm!: FormGroup;
  validation: boolean = false;
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private bussinesService = inject(BussinesService);
  private toasService = inject(ToastAlertService);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);
  private store = inject(Store);

  constructor() {
    this.buildForm();
  }

  forgotPassword(action?: any) {
    const ancho = this.obtenerAnchoDePantalla();
    const width = ancho >= 768 ? '50%' : '100%';

    const dialogActionDetail = this.dialog.open(ForgotPasswordComponent, {
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
  obtenerAnchoDePantalla(): number {
    const ancho = window.innerWidth;
    return ancho;
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      businessCode: [''],
    });
  }
  login() {
    if (this.loginForm.valid) {
      this.authService
        .sendLogin(this.loginForm.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: resp => {
            if (resp.code === 10000) {
              this.validation = true;
              this.bussinesService.saveBussinesId(resp.reply.workerId);
              Cookies.set('user', this.loginForm.controls['username'].value);
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

  async googleLogin() {
    const response: Observable<any> = await this.authService.loginWithGoogle();

    response.subscribe(resp => {
      if (resp.code === 10000) {
        //CODIGO INICIO DE SESION
        this.validation = true;
        //this.bussinesService.saveBussinesId(resp.reply.business.businessId);
        Cookies.set('user', resp.reply.userName);
        this.store.dispatch(
          SessionActions.loadSession({ idWorker: -1, token: resp })
        );
      } else {
        this.toasService.error(resp.detail);
      }
    });
  }

  async microsoftLogin() {
    const response: Observable<any> =
      await this.authService.loginWithMicrosoft();

    response.subscribe(resp => {
      if (resp.code === 10000) {
        //CODIGO INICIO DE SESION
        console.log('regrso microsfot', resp);
        this.validation = true;
        //this.bussinesService.saveBussinesId(resp.reply.business.businessId);
        Cookies.set('user', resp.reply.userName);
        this.store.dispatch(
          SessionActions.loadSession({ idWorker: -1, token: resp })
        );
      } else {
        this.toasService.error(resp.detail);
      }
    });
  }
}
