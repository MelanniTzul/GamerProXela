import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { InputType } from '@core/models';
import { CustomLabelDirective } from '@shared/directives';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'shared-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomLabelDirective,
    MatInputModule,
  ],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input()
  public labelTitle!: string;

  @Input()
  public labelStyle: string = '';

  @Input()
  public type: InputType = 'text';

  @Input()
  public placeholder: string = '';

  @Input()
  public styleText: string = '';

  @Input()
  public control!: FormControl;
}
