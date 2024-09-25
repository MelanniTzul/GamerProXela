import { Injectable } from '@angular/core';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root',
})
export class BussinesService {
  private name = 'bussinesId';
  saveBussinesId(code: string | number): void {
    setCookie(this.name, code);
  }

  getBussinesId() {
    const token = getCookie(this.name);
    return token;
  }

  removeBussinesId() {
    removeCookie(this.name);
  }
}
