import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './productos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductosComponent { }
