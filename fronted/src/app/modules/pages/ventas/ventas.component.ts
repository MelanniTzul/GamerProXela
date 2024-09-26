import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './ventas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VentasComponent { }
