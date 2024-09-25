import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  convertFileToBase64(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event: any) =>
      result.next(btoa(event.target.result.toString()));
    return result;
  }
}
