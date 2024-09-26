import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-bodega',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>bodega works!</p>`,
  templateUrl: './bodega.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodegaComponent { }
