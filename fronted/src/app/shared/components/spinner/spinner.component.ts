import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpinnerService } from '@core/services';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'shared-spinner',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styles: [
    `
      .overlay {
        background-color: rgba(0, 0, 0, 0.9);
        z-index: 9999;
      }
    `,
  ],
})
export class SpinnerComponent {
  private spinnerService = inject(SpinnerService);

  public finishedSpinnerCheck = computed<boolean>(() => {
    return this.spinnerService.isLoading();
  });
}
