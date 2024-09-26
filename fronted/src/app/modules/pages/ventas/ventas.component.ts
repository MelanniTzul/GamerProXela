import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from "../../../shared/components/button/button.component";

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent
],
  templateUrl: './ventas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VentasComponent { }
