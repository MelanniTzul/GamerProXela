import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigService } from '@core/services';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'shared-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() typeBtn: 'button' | 'reset' | 'submit' = 'button';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() icon!: string;
  @Input() disabled: boolean = false;

  private readonly store = inject(Store);


  private config = inject(ConfigService);

  public colorTheme = computed(() => {
    // switch (this.color) {
    //   case 'accent':
    //     return this.theme()[0]?.accent;
    //   case 'primary':
    //     return this.theme()[0]?.primary;
    //   case 'warn':
    //     return this.theme()[0]?.warn;
    // }
  });
}
