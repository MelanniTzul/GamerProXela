

import {
  Component,
  DestroyRef,
  Inject,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { SpinnerService, ToastAlertService } from '@core/services';

import { Cookies } from 'typescript-cookie';
import { ButtonComponent } from '@shared/components/button/button.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf, NgFor } from '@angular/common';
import { InputComponent } from '@shared/components/input/input.component';
import { TitleComponent } from '@shared/components/title/title.component';
import { MatCardModule } from '@angular/material/card';
interface Role {
    value: number;
    viewValue: string;
  }
@Component({
  selector: 'app-user-create-modal',
  templateUrl: './modalIngresarTrabajador.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    TitleComponent,
    ReactiveFormsModule,
    MatDialogContent,
    InputComponent,
    NgIf,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    MatOptionModule,
    MatDialogActions,
    ButtonComponent,
    MatDialogClose,
  ],
})
export class ModalIngresarTrabajadorComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  // Validations
  public operation = '';
  public userForm!: any;
  public toCreate!: boolean;
  public isSysAdmin = false;
  public isAccess = false;
  // Services
  private alertService = inject(ToastAlertService);
  private _spinner = inject(SpinnerService);
  // DATA
  roles: Role[] = [
    {value: 1, viewValue: 'Administrador'},
    {value: 2, viewValue: 'Cajero'},
    {value: 3, viewValue: 'Bodega'},
    {value: 4, viewValue: 'Inventario'},
  ];
  public selectedBussines = 0;
  public selectedRole = 0;
  public bussinessWorker = 0;
  sysadminselect: boolean = true;
  workerCodes: string[] = [];
//   public typeForm = this.data.data;
  codeEdit = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalIngresarTrabajadorComponent>
  ) {
    this.buildform();
    this.dialogRef.disableClose = true;
    this.codeEdit = this.data?.data?.user_code;
  }

  private destroyRef = inject(DestroyRef);
  roleName = signal<string>('');
  async ngOnInit() {
    this.roleName.set(Cookies.get('role')!.toString());

    this.ChargeRoleWorker();
    this.getRoles();

    this.setValidatos();
  }

  setValidatos() {
    this.userForm.get('role_id').valueChanges.subscribe((rol: string) => {
      if (this.isSysAdmin) {
        if (rol == '10') {
          this.userForm.get('businessId').setValidators([]);
        } else {
          this.userForm.get('businessId').setValidators([Validators.required]);
        }
        this.userForm.get('businessId').updateValueAndValidity();
      }
    });

    if (this.bussinessWorker != 0 && !this.isSysAdmin) {
      this.userForm.get('businessId').setValidators([]);
      this.userForm.get('businessId').updateValueAndValidity();
    }
    if (this.data.type == 'Editar' && this.data.data.roleId == 4) {
      this.userForm.get('workerGroupId').setValidators([Validators.required]);
      this.userForm.get('buildingId').setValidators([Validators.required]);
      this.userForm.get('businessId').updateValueAndValidity();
    }
  }

//   onInputChange(event: Event): void {
//     const inputElement = eve
//         nt.target as HTMLInputElement;
//     const inputValue = inputElement.value.toUpperCase();
//     this.userForm.patchValue({ user_code: inputValue }, { emitEvent: false });
//   }


  

  getRoles() {
   
    
  }
  ChargeRoleWorker() {
    const role = Cookies.get('role');
    if (role != null) {
      if (role == 'SYSADMIN') {
        this.isSysAdmin = true;
      } else {
        this.isSysAdmin = false;
      }

      if (role == 'ACCESOS') {
        this.isAccess = true;
      } else {
        this.isAccess = false;
      }
    }
  }

  whenRolesChange() {
   
  }


  public onSubmit(): void {
    if (this.userForm.valid) {
      if (this.data.type == 'Crear') {
        const data = {
        user_name: this.userForm.value.user_name,
        password: this.userForm.value.password,
        address: this.userForm.value.address,
        role_id: this.userForm.value.role_id,
        type_login: 0,
        };
      
        let cadena: string = data.password;
        cadena = cadena.trim();
        data.password = cadena;

        // this.userService.storeUserApp(data).subscribe({
        //   next: resp => {
        //     if (resp.code === 10000) {
        //       this.alertService.sucess(`Usuario creado con éxito`);
        //       this.dialogRef.close(true);
        //     } else {
        //       this.alertService.error(resp.detail);
        //     }
        //   },
        //   error: error => {
        //     this.alertService.error(`Error: ${error}`);
        //   },
        // });
      } else {
        const data = {
          worker_id: this.data.data.worker_id,
          businessId: this.userForm.value.businessId,
          email: this.userForm.value.email,
          secondEmail: this.userForm.value.secondEmail,
          phone: this.userForm.value.phone,
          address: this.userForm.value.address,
          buildingId: this.userForm.value.buildingId,
          workerGroupId: this.userForm.value.workerGroupId,
          first_name: this.userForm.value.first_name,
          last_name: this.userForm.value.last_name,
          user_name: this.userForm.value.user_name,
        };
        if (this.userForm.value.businessId == null) {
          delete data.businessId;
        } //FIX BUSSINESS_ID
        if (
          this.userForm.value.workerGroupId == 0 ||
          this.userForm.value.workerGroupId == null
        ) {
          delete data.workerGroupId;
        } //FIX GROUP
        if (
          this.userForm.value.buildingId == 0 ||
          this.userForm.value.buildingId == null ||
          data.address == null
        ) {
          delete data.buildingId;
        } //FIX GROUP
        if (data.address == null) {
          data.address = '--';
        }

        // this.userService.updateUser(data, data.worker_id).subscribe({
        //   next: resp => {
        //     this.dialogRef.close(true);
        //     if (resp.code === 10000) {
        //       this.alertService.sucess(`Usuario modificado con éxito`);
        //     } else {
        //       this.alertService.error(resp.detail);
        //     }
        //   },
        //   error: error => {
        //     this.alertService.error(`Error: ${error}`);
        //   },
        // });
      }
    }
  }
  
  private buildform() {
    if (this.data?.type == 'Editar') {
      this.userForm = this.formBuilder.group({
        user_name: [this.data.data.user_name, Validators.required],
        role_id: [this.data.data.role_id],
        address: [this.data.data.address, Validators.required],
      });
    } else {
      if (this.data.data == 'checkWeb') {
        this.userForm = this.formBuilder.group({
          user_name: ['', Validators.required],
          password: ['', Validators.required],
          role_id: ['', Validators.required],
          address: ['', Validators.required],
        });
      } else {
        this.userForm = this.formBuilder.group({
          user_name: ['', Validators.required],
          role_id: [''],
          address: ['', Validators.required],
          password: ['', Validators.required],
        });
      }
    }
  }


}
