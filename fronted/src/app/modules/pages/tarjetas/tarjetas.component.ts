import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleComponent } from "../../../shared/components/title/title.component";

@Component({
  selector: 'app-tarjetas',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent
],
  templateUrl: './tarjetas.component.html',
})
export class TarjetasComponent { }
