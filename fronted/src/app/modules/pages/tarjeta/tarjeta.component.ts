import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './tarjeta.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarjetaComponent { }
