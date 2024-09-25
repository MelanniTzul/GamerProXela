import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  // Signals
  private _isLoading = signal(false);
  public isLoading = computed(() => this._isLoading());

  show() {
    this._isLoading.set(true);
  }

  hide() {
    this._isLoading.set(false);
  }
}
