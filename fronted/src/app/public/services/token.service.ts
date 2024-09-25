import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private nameToken = 'token-jobpoint';
  private oneHour = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);

  saveToken(token: string): void {
    setCookie(this.nameToken, token, { expires: this.oneHour });

    //CODIGO NUEVO
    const decodeToken = jwtDecode<JwtPayload>(token);
    const tokenDate = new Date(0);
    if (decodeToken.exp) tokenDate.setUTCSeconds(decodeToken.exp);
    //CODIGO NUEVO

    setCookie('token-expiration', tokenDate.toString());
  }

  getToken() {
    const token = getCookie(this.nameToken);
    return token;
  }

  getTokenExpiration() {
    const token = getCookie('token-expiration');
    return token;
  }

  removeToken() {
    removeCookie(this.nameToken);
    removeCookie('token-expiration');
  }

  saveTheme(id: number): void {
    setCookie('theme', id);
  }

  getTheme() {
    const theme = getCookie('theme');
    return theme;
  }

  removeTheme() {
    removeCookie('theme');
  }

  saveCompany(id: number | string): void {
    setCookie('company', id);
  }

  getCompany() {
    const theme = getCookie('company');
    return theme;
  }

  removeCompany() {
    removeCookie('company');
  }

  saveLogo(id: number): void {
    setCookie('logo', id);
  }

  getLogo() {
    const theme = getCookie('logo');
    return theme;
  }

  getRole() {
    const theme = getCookie('role');
    return theme;
  }
  removeLogo() {
    removeCookie('logo');
  }

  isValidToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
