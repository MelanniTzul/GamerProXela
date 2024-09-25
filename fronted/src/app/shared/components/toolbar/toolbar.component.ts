import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitleComponent } from '../title';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'shared-toolbar',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule, TitleComponent],
  templateUrl: './toolbar.component.html',
  styles: [
    `
      .page-header {
        background: none;
      }
    `,
  ],
})
export class ToolbarComponent {
  @Input()
  public title!: string;
  @Input()
  public subtitle!: any;
}
