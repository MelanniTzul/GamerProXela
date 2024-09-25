import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, inject, DestroyRef, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
// import { ToastAlertService } from '@core/services';
import { AuthService } from '../../services/auth.service';
import { Cookies } from 'typescript-cookie';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { MatDivider } from '@angular/material/divider';
import { ButtonComponent } from '@shared/components';
// import { ToastAlertService } from '../services/toast-alert.service';
import { MatListModule } from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
// import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

interface Role {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-login-form',
  templateUrl: './login-page.component.html',
  styles: [
    `
      .container {
        background: #2a0e50;
      }
    `,
  ],

  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ButtonComponent,
    MatCardModule,
    MatDivider,
    NgOptimizedImage,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class LoginPageComponent {
  hide = true;
  loginForm!: FormGroup;
  validation: boolean = false;
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  // private branchService = inject(BranchOfficeService);
  // private toasService = inject(ToastAlertService);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);
  private store = inject(Store);
  private router = inject(Router);

  roles: Role[] = [
    {value: 1, viewValue: 'Administrador'},
    {value: 2, viewValue: 'Cajero'},
    {value: 3, viewValue: 'Bodega'},
    {value: 4, viewValue: 'Inventario'},
  ];
  constructor() {
    this.buildForm();

  }


  obtenerAnchoDePantalla(): number {
    const ancho = window.innerWidth;
    return ancho;
  }


  chargueFloorByBuilding(buldingid: number) {

  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
        this.authService
            .sendLogin(this.loginForm.value)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: resp => {
                    // Verifica si la respuesta tiene un mensaje de éxito
                    if (resp.status === "OK") {
                        // Puedes guardar el ID de trabajador o cualquier otra información aquí
                        // this.branchService.saveBussinesId(resp.workerId);
                        // Guarda el nombre de usuario en cookies
                        Cookies.set('user', this.loginForm.controls['username'].value);
                        this.router.navigateByUrl('/home/dashboard');
                        // this.toasService.warning('¡Bienvenido! ' + resp.username);
                    } else {
                        // Si la respuesta no es un mensaje de éxito, muestra el mensaje de error
                        // this.toasService.error(resp.status);
                    }
                },
                error: err => {
                    // Maneja errores de la petición (errores de red, etc.)
                    // this.toasService.error('Error de conexión, intente nuevamente.');
                }
            });
    } else {
        // this.toasService.error('Por favor, completa todos los campos requeridos.');
    }
}

}
