import { Injectable, computed, signal } from '@angular/core';

// import { Theme } from '../../admin/models/';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _currentTheme = signal(null);
  public currentTheme = computed(() => this._currentTheme());

  setTheme(theme: any) {
    // this._currentTheme.set(theme);
  }
}
