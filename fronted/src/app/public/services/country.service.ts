import { Injectable, inject } from '@angular/core';
import { Country } from '@core/models';
import { ApiService } from '@core/services';
// import { Country } from '../models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiService = inject(ApiService);

  storeCountry(data: Country) {
    return this.apiService.store(
      `country?name=${data.name}&code=${data.code}`,
      undefined
    );
  }

  deleteCountry(id: number) {
    return this.apiService.delete('country', id);
  }

  getCountrys() {
    return this.apiService.getAll('country');
  }

  getCountry(id: number): Observable<Country> {
    return this.apiService.getById('', id);
  }

  updateCountry(data: Country, id: number) {
    return this.apiService.update(
      `country/${id}?name=${data.name}&code=${data.code}`,
      undefined,
      0
    );
  }
}
