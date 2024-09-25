import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Component,
  EventEmitter,
  Output,
  inject,
  DestroyRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastAlertService } from '@core/services';
import { AuthService, TokenService } from '../../services';
import { BussinesService } from '../../services/bussines.service';
import { Cookies } from 'typescript-cookie';

// NgRx
import { Store } from '@ngrx/store';
import { SessionActions } from '@store/actions';
import { ButtonComponent } from '@shared/components/button/button.component';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TitleComponent } from '@shared/components/title/title.component';
import { MatCardModule } from '@angular/material/card';
import { OtpInputComponent } from '@shared/components';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  standalone: true,
  imports: [
    TitleComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    ButtonComponent,
    MatCardModule,
    OtpInputComponent,
    NgOptimizedImage,
  ],
})
export class ValidationComponent {
  validationForm!: FormGroup;

  private store = inject(Store);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private bussinesService = inject(BussinesService);
  private toastService = inject(ToastAlertService);
  private tokenService = inject(TokenService);
  private destroyRef = inject(DestroyRef);
  @Output() back = new EventEmitter<boolean>();
  private router = inject(Router);

  constructor() {
    this.buildForm();
  }

  sendValidation() {
    if (this.validationForm.valid) {
      console.log('Vlidacion', this.validationForm.value);
      this.store.dispatch(
        SessionActions.loadSession(this.validationForm.value)
      );

      // this.authService
      //   .validationLogin(this.validationForm.value)
      //   .pipe(takeUntilDestroyed(this.destroyRef))
      //   .subscribe({
      //     next: (resp) => {
      //       if (resp.status === 'OK') {
      //         this.tokenService.saveToken(resp.reply.token);
      //         if (resp.reply.businessId) {
      //           this.bussinesService.saveBussinesId(resp.reply.businessId);
      //         }
      //         this.router.navigateByUrl('/admin/dashboard');
      //       } else {
      //         this.toastService.error('Codigo no valido');
      //       }
      //     },
      //     error: (error) => {
      //       this.toastService.error('Codigo incorrecto');
      //     },
      //   });
    }
  }

  return() {
    this.back.emit(false);
    this.bussinesService.removeBussinesId();
    Cookies.remove('user');
  }

  private buildForm() {
    this.validationForm = this.formBuilder.group({
      token: ['', [Validators.required]],
      idWorker: [
        Number(this.bussinesService.getBussinesId()),
        Validators.required,
      ],
    });
  }
}
