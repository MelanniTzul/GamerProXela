import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Component,
  OnInit,
  ViewChild,
  inject,
  DestroyRef,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { ReportPlaceService } from '../../../services/report-place.service';
// import { BussinesService } from '../../../../public/services';
// import {
//   BuildingService,
//   BusinessService,
//   FloorService,
// } from '../../../services';
// import { WorkplaceTypeService } from '../../../services/workplace-type.service';
// import { WorkplaceGroupService } from '../../../services/workplace-group.service';
// import { Reports } from '../../../models/reports.model';
// import {
//   Building,
//   Business,
//   Floor,
//   TypeOfJob,
//   Workplace,
// } from '../../../models';
import { ToastAlertService } from '@core/services';
import { AsyncPipe, DatePipe, NgFor } from '@angular/common';
import { ButtonComponent } from '@shared/components/button/button.component';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { TitleComponent } from '@shared/components/title/title.component';
import { MatCardModule } from '@angular/material/card';
import { Cookies } from 'typescript-cookie';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'place-report',
  templateUrl: './report.component.html',
  standalone: true,
  imports: [
    MatCardModule,
    TitleComponent,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    NgFor,
    MatOptionModule,
    MatInputModule,
    ButtonComponent,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    AsyncPipe,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
})
export class ReportComponent implements OnInit {
  paginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private formBuilder = inject(FormBuilder);
  // private reportsService = inject(ReportPlaceService);
  // private businessService = inject(BussinesService);
  // private buildingService = inject(BuildingService);
  // private workplaceTypeService = inject(WorkplaceTypeService);
  // private workerPlaceService = inject(WorkplaceGroupService);
  // private floorService = inject(FloorService);
  private alertService = inject(ToastAlertService);
  private pipe = new DatePipe('en-US');
  private destroyRef = inject(DestroyRef);
  formReports!: FormGroup;
  // ptypeJobs: TypeOfJob[] = [];
  // buildings: Building[] = [];
  // workPlaces: Workplace[] = [];
  // floors: Floor[] = [];
  displayedColumns: string[] = ['building', 'floor', 'workplace', 'frequency'];
  // workplacesFilter = signal<Workplace[]>([]);

  // private businessServices = inject(BusinessService);
  public selectedBussines = -1;
  // public bussines: Business[] = [];
  private businessIdstate: number | null | undefined;
  formCompleted: boolean = false;
  myControl = new FormControl('');
  public selectedBussinesName = '';
  // dataSource: MatTableDataSource<Reports>;
  constructor() {
    this.paginatorIntl = new MatPaginatorIntl();
    // this.dataSource = new MatTableDataSource();
    this.buildForm();
  }

  ngOnInit(): void {
    this.role();
    this.getBusiness();
    const business = Cookies.get('bussinesId');
    console.log('Validacion', business);
    if (business != null) {
      this.businessIdstate = parseInt(business.toString());
      this.selectedBussines = this.businessIdstate;
    } else {
      this.selectedBussines = -1;
      this.businessIdstate = null;
    }
    this.chargueDataForm();
  }
  private getBusiness() {
    // this.businessServices
    //   .getBusiness()
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe({
    //     next: (request: any) => {
    //       if (request.code === 10000 || request.code === 40009) {
    //         this.bussines = request.reply;
    //         this.filteredOptions = this.myControl.valueChanges.pipe(
    //           startWith(''),
    //           map(value => this._filter(value))
    //         );
    //       }
    //     },
    //   });
  }

  ValidBusiness_id(): boolean {
    return this.businessIdstate === null;
  }
  ValidForms(): boolean {
    if (this.selectedBussines !== -1) {
      return true;
    } else {
      return false;
    }
  }

  chargueDataForm() {
    this.chargueTypeJobs();
    this.chargueBuilding();
  }

  private buildForm() {
    this.formReports = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
      workplaceTypeId: [''],
      buildingId: [''],
      floorId: [''],
      workplaceId: [''],
      worker: [''],
      businessId: [this.selectedBussines],
    });
  }

  findData() {
    // this.dataSource = new MatTableDataSource<Reports>();
    if (this.ValidForms()) {
      if (this.formReports.valid) {
        const workplaceIdControl = this.formReports?.get('workplaceId');
        if (workplaceIdControl && workplaceIdControl.value === -1) {
          this.formReports?.get('workplaceId')?.setValue('');
        }

        const buildingIdControl = this.formReports?.get('buildingId');
        if (buildingIdControl && buildingIdControl.value === -1) {
          this.formReports?.get('buildingId')?.setValue('');
        }

        const floorIdControl = this.formReports?.get('floorId');
        if (floorIdControl && floorIdControl.value === -1) {
          this.formReports?.get('floorId')?.setValue('');
        }

        const workplaceTypeIdControl = this.formReports?.get('workplaceTypeId');
        if (workplaceTypeIdControl && workplaceTypeIdControl.value === -1) {
          this.formReports?.get('workplaceTypeId')?.setValue('');
        }
        this.formReports?.get('businessId')?.setValue(this.selectedBussines);
        // this.reportsService
        //   .getReport(this.formReports.value)
        //   .pipe(takeUntilDestroyed(this.destroyRef))
        //   .subscribe({
        //     next: resp => {
        //       if (resp.code === 10000 || resp.code === 40009) {
        //         if (resp.reply && resp.reply.length > 0) {
        //           this.dataSource = new MatTableDataSource(resp.reply);
        //           this.dataSource.paginator = this.paginator;
        //         } else {
        //           this.alertService.error(resp.reason);
        //         }
        //       }
        //     },
        //   });
      }
    }
  }

  private chargueTypeJobs() {
    if (this.selectedBussines !== -1) {
      // this.workplaceTypeService
        // .getWorkplaces(this.selectedBussines)
        // .pipe(takeUntilDestroyed(this.destroyRef))
        // .subscribe({
        //   next: resp => {
        //     if (resp.code === 10000 || resp.code === 40009) {
        //       const tyjobs = {
        //         workplacetypeid: -1,
        //         name: '--',
        //         description: '',
        //         recurrence: -1,
        //         maxcapacity: -1,
        //         isparking: '',
        //         blockstatus: -1,
        //         icon: '',
        //         color: '',
        //       };
        //       this.ptypeJobs = [tyjobs, ...resp.reply];
        //     } else {
        //       this.alertService.error(resp.detail);
        //     }
        //   },
        // });
    }
  }

  private chargueBuilding() {
    // if (this.selectedBussines !== -1) {
    //   this.buildingService
    //     .getBuildings(this.selectedBussines)
    //     .pipe(takeUntilDestroyed(this.destroyRef))
    //     .subscribe({
    //       next: resp => {
    //         if (resp.code === 10000 || resp.code === 40009) {
    //           const building = {
    //             buildingid: -1,
    //             name: '--',
    //             code: '',
    //             address: '',
    //             city: '',
    //             country: '',
    //           };
    //           this.buildings = [building, ...resp.reply];
    //         } else {
    //           this.alertService.error(resp.detail);
    //         }
    //       },
    //     });
    // }
  }

  chargueWorkplaces(idFloor: number) {
    // if (idFloor !== -1) {
    //   this.workerPlaceService
    //     .getWorkplaceByFloor(idFloor)
    //     .pipe(takeUntilDestroyed(this.destroyRef))
    //     .subscribe({
    //       next: resp => {
    //         if (resp.code === 10000 || resp.code === 40009) {
    //           const workplace = {
    //             workplaceid: -1,
    //             name: '--',
    //             description: '',
    //             id: -1,
    //           };
    //           this.workPlaces = [workplace, ...resp.reply];
    //           const type = this.formReports?.get('workplaceTypeId')?.value;
    //           console.log('type', type);
    //           this.filterWorkplacesByTypeId(type);
    //         } else {
    //           this.alertService.error(resp.detail);
    //         }
    //       },
    //     });
    // }
  }
  filterWorkplacesByTypeId(typeId: number) {
    console.log('Filtrando', typeId);
    if (typeId > 0) {
      console.log('True');
      const workplace = {
        workplaceid: -1,
        name: '--',
        description: '',
        id: -1,
        code: -1,
        phone: '',
        x: 1,
        y: 1,
        status: 1,
        workplacetypeid: -1,
        roleid: 1,
        workplacegroupid: -1,
      };
      // const filteredWorkplaces = this.workPlaces.filter(
      //   workplace => workplace.workplacetypeid === typeId
      // );
      // filteredWorkplaces.unshift(workplace);

      // this.workplacesFilter.set(filteredWorkplaces);
    } else {
      console.log('False');
      // this.workplacesFilter.set(this.workPlaces);
    }
  }

  chargueFloorByBuilding(buldingid: number) {
    if (buldingid !== -1) {
      // this.floors = [];
      // this.workPlaces = [];
      // this.floorService
        // .getFloorsByBuilding(buldingid)
        // .pipe(takeUntilDestroyed(this.destroyRef))
        // .subscribe({
        //   next: resp => {
        //     if (resp.code === 10000 || resp.code === 40009) {
        //       const floor = {
        //         floorid: -1,
        //         name: '--',
        //         description: '',
        //         map: '',
        //         buildingid: -1,
        //         isParking: 1,
        //       };
        //       this.floors = [floor, ...resp.reply];
        //     } else {
        //       this.alertService.error(resp.detail);
        //     }
        //   },
        // });
    }
  }

  downloadCsv() {
    // if (this.ValidForms()) {
    //   this.formReports?.get('businessId')?.setValue(this.selectedBussines);
    //   this.reportsService
    //     .getReportCsv(this.formReports.value)
    //     .pipe(takeUntilDestroyed(this.destroyRef))
    //     .subscribe((data: Blob) => {
    //       if (data.type == 'application/json') {
    //         this.alertService.warning('No hay datos para descargar.');
    //       } else {
    //         const file = new Blob([data], { type: 'application/pdf' });
    //         const url = window.URL.createObjectURL(file);
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.download = 'reporte_mas_ocupados.csv';
    //         link.click();
    //         window.URL.revokeObjectURL(url);
    //       }
    //     });
    // }
  }

  downloadPDF(): void {
    // if (this.ValidForms()) {
    //   this.formReports?.get('businessId')?.setValue(this.selectedBussines);
    //   this.reportsService
    //     .getReportPdf(this.formReports.value)
    //     .pipe(takeUntilDestroyed(this.destroyRef))
    //     .subscribe((data: Blob) => {
    //       if (data.type == 'application/json') {
    //         this.alertService.warning('No hay datos para descargar.');
    //       } else {
    //         const file = new Blob([data], { type: 'application/pdf' });
    //         const url = window.URL.createObjectURL(file);
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.download = 'reporte_mas_ocupados.pdf';
    //         link.click();
    //         window.URL.revokeObjectURL(url);
    //       }
    //     });
    // }
  }

  submit() {}

  clearForm() {
    this.selectedBussinesName = '';
    this.myControl.setValue(null);
    this.buildForm();
  }

  isrole: boolean = true;
  role() {
    const role = Cookies.get('role');
    if (role && role === 'SYSADMIN') {
      this.isrole = true;
    } else {
      this.isrole = false;
    }
  }
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  onOptionSelected(value: number, name: string) {
    this.selectedBussines = value;
    this.selectedBussinesName = name;
    this.myControl.setValue(this.selectedBussinesName);
    this.applyFilter();
  }

  // filteredOptions: Observable<Business[]> = new Observable<Business[]>(
  //   observer => {
  //     observer.next([]);
  //   }
  // );
  applyFilter() {
    // const value = this.myControl.value;
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(value),
    //   map(value => this._filter(value))
    // );
  }

  // private _filter(value: string | null): Business[] {
  //   const filterValue = (value || '').toLowerCase();
  //   // Actualiza el valor de búsqueda anterior
  //   if (!filterValue) {
  //     return this.bussines;
  //   }
  //   return this.bussines.filter(
  //     bussines =>
  //       this.removeDiacritics(bussines.name.toLowerCase()).includes(
  //         this.removeDiacritics(filterValue)
  //       ) ||
  //       (bussines.idBusiness !== undefined &&
  //         bussines.idBusiness.toString().includes(filterValue))
  //   );
  // }
  removeDiacritics(text: string): string {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
