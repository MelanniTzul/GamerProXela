// import { CommonModule } from '@angular/common';
// import { ChangeDetectionStrategy, Component } from '@angular/core';

// @Component({
//   selector: 'app-productos',
//   standalone: true,
//   imports: [
//     CommonModule,
//   ],
//   templateUrl: './productos.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class ProductosComponent { }
import { Component, inject, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

// import {
//   CountryCreateModalComponent,
//   Country,
//   CountryService,
// } from '../../../index';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ModalAlertComponent } from '@shared/components';
import { ToastAlertService } from '@core/services';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SearchFieldComponent } from '@shared/components/search-field/search-field.component';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Country } from '@core/models';
import { CountryService } from '@public/services';
import { ModalProductoComponent } from '../modalProducto';
@Component({
  templateUrl: './productos.component.html',

  styles: [],
  standalone: true,
  imports: [
    ToolbarComponent,
    SearchFieldComponent,
    ButtonComponent,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
  ],
})
export class ProductosComponent implements OnInit {
  paginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();
  ngOnInit(): void {
    this.chargueCountrys();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private alertService = inject(ToastAlertService);
  dataSource: MatTableDataSource<Country>;
  fielInput!: string;
  private dialog = inject(MatDialog);
  private countryService = inject(CountryService);
  constructor() {
    this.paginatorIntl = new MatPaginatorIntl();
    this.dataSource = new MatTableDataSource();
  }
  displayedColumns: string[] = ['name', 'code', 'options'];

  private chargueCountrys() {
    this.countryService.getCountrys().subscribe({
      next: (resp: any) => {
        if (resp.code === 10000) {
          this.dataSource = new MatTableDataSource(resp.reply);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          if (this.paginator) {
            this.paginator._intl.itemsPerPageLabel = 'Registros por página';
            this.paginator._intl.nextPageLabel = 'Página siguiente ';
            this.paginator._intl.previousPageLabel = 'Página anterior';
            this.paginator._intl.firstPageLabel = 'Primera página';
            this.paginator._intl.lastPageLabel = 'Última página';
            // Configuración del texto de la última página
            this.paginator._intl.getRangeLabel = (
              page: number,
              pageSize: number,
              length: number
            ) => {
              if (length === 0 || pageSize === 0) {
                return `0 de ${length}`;
              }
              length = Math.max(length, 0);
              const startIndex = page * pageSize;
              const endIndex =
                startIndex < length
                  ? Math.min(startIndex + pageSize, length)
                  : startIndex + pageSize;
              return `${startIndex + 1} - ${endIndex} de ${length}`;
            };
          }
        } else {
          this.alertService.error(resp.detail);
        }
      },
    });
  }

  modalAction(action?: Country) {
    let width: string;
    if (window.innerWidth <= 768) {
      width = '90%';
    } else {
      width = '50%';
    }
    const dialogActionDetail = this.dialog.open(ModalProductoComponent, {
      width: width,
      data: {
        action: action,
      },
      disableClose: true,
    });
    dialogActionDetail.afterClosed().subscribe(result => {
      if (result) this.chargueCountrys();
    });
  }

  modalDelete(action: Country) {
    // const dialogDelete = this.dialog.open(ModalAlertComponent, {
    //   data: action.name,
    //   disableClose: true,
    // });
    // dialogDelete.afterClosed().subscribe((result: boolean) => {
    //   if (!result) return;
    //   this.deleteCountry(action?.countryid as number);
    // });
  }

  private deleteCountry(id: number) {
    // this.countryService.deleteCountry(id).subscribe({
    //   next: resp => {
    //     if (resp.code === 10000) {
    //       this.alertService.sucess('País eliminado');
    //       this.chargueCountrys();
    //     } else {
    //       this.alertService.error(resp.detail);
    //     }
    //   },
    // });
  }
}
