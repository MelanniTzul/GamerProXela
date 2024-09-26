import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './inventario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventarioComponent { }
