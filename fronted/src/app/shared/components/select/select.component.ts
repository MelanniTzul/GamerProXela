import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CustomLabelDirective } from '@shared/directives';
import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'shared-select',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CustomLabelDirective,
  ],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input()
  public labelTitle!: string;

  @Input()
  public labelStyle: string = '';

  @Input()
  public placeholder: string = '';

  @Input()
  public control!: FormControl;

  @Input()
  options: any;

  @Input()
  selectId = '';
}
