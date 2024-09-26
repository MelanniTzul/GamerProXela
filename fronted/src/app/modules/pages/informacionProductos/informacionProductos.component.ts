import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-informacion-productos',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './informacionProductos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformacionProductosComponent { }
