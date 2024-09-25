import { Directive, ElementRef, Input, inject } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
  standalone: true,
})
export class CustomLabelDirective {
  private htmlElement?: ElementRef<HTMLElement>;
  private _errors?: ValidationErrors | null;

  private elementRef = inject(ElementRef<HTMLElement>);

  @Input()
  set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor() {
    this.htmlElement = this.elementRef;
  }

  public setErrorMessage(): void {
    if (!this.htmlElement) return;

    if (!this._errors) {
      this.htmlElement.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys(this._errors);

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido.';
    }

    if (errors.includes('maxlength')) {
      const { requiredLength } = this._errors['maxlength'];

      this.htmlElement.nativeElement.innerText = `Este campo debe tener como máximo ${requiredLength} caracteres.`;
      return;
    }

    if (errors.includes('minlength')) {
      const { requiredLength } = this._errors['minlength'];

      this.htmlElement.nativeElement.innerText = `Este campo debe tener como mínimo ${requiredLength} caracteres.`;
      return;
    }

    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerText =
        'Este campo debe ser un email válido.';
    }

    if (errors.includes('min')) {
      const { min } = this._errors['min'];
      this.htmlElement.nativeElement.innerText = `Este campo debe ser mayor a  ${min}`;
      return;
    }

    if (errors.includes('pattern')) {
      const { requiredPattern } = this._errors['pattern'];
      if (requiredPattern === '^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\\s]+$')
        this.htmlElement.nativeElement.innerText =
          'Este campo no puede ser numérico y/o carácter especial.';
      if (requiredPattern === '^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\\s,.]+$')
        this.htmlElement.nativeElement.innerText =
          'Este campo no puede ser numérico y/o carácter especial.';
      if (
        requiredPattern ===
        '^\\+?\\(?[1-9]\\d{0,2}\\)?\\s?\\d{1,4}\\s?\\d{1,4}\\s?\\d{0,4}$'
      )
        this.htmlElement.nativeElement.innerText =
          'Debe ser un número de teléfono en un formato válido.';
      if (requiredPattern === '^\\d+(-\\d+)*$')
        this.htmlElement.nativeElement.innerText =
          'Este campo debe contener solo números con guiones opcionales entre ellos';
      if (requiredPattern === '^[1-7]$')
        this.htmlElement.nativeElement.innerText =
          'El valor esta fuera de lo permitido (1-7)';
      return;
    }
  }
}
