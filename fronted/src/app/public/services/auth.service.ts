import { Injectable, inject } from '@angular/core';
import { ApiService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiService = inject(ApiService);



    sendLogin(data: any) {
      // return this.apiService.store('/auth/login', data);
      // return this.apiService.store('//api/auth/login', data);
      return this.apiService.store('/login', data);

    }

}
