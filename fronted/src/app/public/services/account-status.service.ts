import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService, ToastAlertService } from '@core/services';
import { AccountStatus } from '../models/account-status.model';
import { Cookies } from 'typescript-cookie';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountStatusService {
  private apiService = inject(ApiService);
  #destroyRef = inject(DestroyRef);
  #toastService = inject(ToastAlertService);
  #router = inject(Router);

  #setAccountStatus(status: string) {
    Cookies.set('account-status', status);
  }

  getAccountStatus() {
    return Cookies.get('account-status');
  }

  deleteAccountStatus() {
    Cookies.remove('account-status');
  }

  getStatusAccountById(id: string) {
    return this.apiService
      .get<AccountStatus>(`accountStatus/check/${id}`)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: ({ code, reply, detail }) => {
          if (code === 10000) {
            this.#setAccountStatus(reply.status);
            if (reply.status === 'suspendido')
              this.#router.navigateByUrl('/suspend');
          } else {
            this.#toastService.error(detail);
          }
        },
        error: error => this.#toastService.error(error.message),
      });
  }
}
