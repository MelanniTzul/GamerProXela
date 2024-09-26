import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private _isShowSidebar = signal<boolean>(true);
  public isShowSidebar = computed(() => this._isShowSidebar());

  public changeShow(state: boolean) {
    this._isShowSidebar.set(state);
  }
}
