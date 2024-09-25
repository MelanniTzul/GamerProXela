import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styles: [],
})
export class FooterComponent {
  year: number;
  @Input() login!: boolean;

  constructor() {
    this.year = new Date().getFullYear();
  }
}
