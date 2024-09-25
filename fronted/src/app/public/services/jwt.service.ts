import { Injectable, inject } from '@angular/core';
import { ApiService } from '@core/index';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private apiService = inject(ApiService);

  validationLogin() {
    return this.apiService.post<string>(`tokenJwt/refresh`, {});
  }

  constructor() {}
}
