import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { InputType } from '@core/models';
import { CustomLabelDirective } from '@shared/directives';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'shared-text-area',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    CustomLabelDirective,
  ],
  templateUrl: './text-area.component.html',
})
export class TextAreaComponent {
  @Input()
  public labelTitle!: string;

  @Input()
  public labelStyle: string = '';

  @Input()
  public placeholder: string = '';

  @Input()
  public control!: FormControl;
}
