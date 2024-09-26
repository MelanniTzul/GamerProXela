import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleComponent } from "../../../shared/components/title/title.component";

@Component({
  selector: 'app-registrar-trabajadores',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent
],
  templateUrl: './registrarTrabajadores.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrarTrabajadoresComponent { }
