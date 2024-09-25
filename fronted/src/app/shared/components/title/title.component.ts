import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '@core/services';
import { Store } from '@ngrx/store';

@Component({
  selector: 'shared-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title.component.html',
})
export class TitleComponent {
  private config = inject(ConfigService);
  private readonly store = inject(Store);


}
