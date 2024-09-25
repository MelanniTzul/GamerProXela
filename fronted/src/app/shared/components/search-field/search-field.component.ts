import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'shared-search-field',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatIconModule],
  templateUrl: './search-field.component.html',
})
export class SearchFieldComponent {
  @Input() data!: MatTableDataSource<any>;
  @Output() inputValue = new EventEmitter<string>();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.emit(filterValue);
  }

  emit(value: string) {
    this.data.filterPredicate = (data, filter) => {
      for (const key in data) {
        if (data.hasOwnProperty(key) && typeof data[key] === 'string') {
          const normalizedData = data[key]
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
          const normalizedFilter = filter
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
          if (normalizedData.includes(normalizedFilter)) {
            return true;
          }
        }
      }
      return false;
    };

    this.inputValue.emit(value);
    const filterValue = this.normalizeValue(value);
    this.data.filter = filterValue.trim().toLowerCase();
    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  normalizeValue(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
