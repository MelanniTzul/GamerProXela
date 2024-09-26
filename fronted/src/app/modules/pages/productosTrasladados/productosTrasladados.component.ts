import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleComponent } from "../../../shared/components/title/title.component";

@Component({
  selector: 'app-productos-trasladados',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent
],
  templateUrl: './productosTrasladados.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductosTrasladadosComponent { }
