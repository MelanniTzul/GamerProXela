import {
  DestroyRef,
  Injectable,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ApiService } from '@core/services/index';
import { Logo } from '@core/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogoService {
  private _currentLogo = signal<Logo | null>(null);
  public currentLogo = computed(() => this._currentLogo());

  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);

  public setLogo(id: string | undefined | number | null) {
    this.apiService
      .get<Logo>(`logo/${id}`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ reply }) => {
          this._currentLogo.set(reply);
        },
        error: error => {
          console.log(error);
        },
      });
  }

  public putLogo(body: object, id: string): Observable<any> {
    return this.apiService.update(`logo/${id}`, body);
  }

  getOneLogo(logo: string | number) {
    return this.apiService.get<Logo>(`logo/${logo}`);
  }
}
