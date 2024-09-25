import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  //TODO: implementar en el login para saber desde el inicio sobre este estado
  isSysAdmin: boolean = true;

  constructor() {}
}
