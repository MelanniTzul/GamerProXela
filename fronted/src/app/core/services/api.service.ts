import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { GeneralResponse } from '..';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl: string = environment.apiUrl;

  private http = inject(HttpClient);

  //* Métodos con genéricos
  get<T>(path: string): Observable<GeneralResponse<T>> {
    return this.http.get<GeneralResponse<T>>(`${this.apiUrl}${path}`);
  }

  post<T>(path: string, body: object): Observable<GeneralResponse<T>> {
    return this.http.post<GeneralResponse<T>>(`${this.apiUrl}${path}`, body);
  }

  put<T>(
    path: string,
    body: object,
    id: number | string
  ): Observable<GeneralResponse<T>> {
    return this.http.put<GeneralResponse<T>>(
      `${this.apiUrl}${path}/${id}`,
      body
    );
  }

  del<T>(path: string, id: number | string): Observable<GeneralResponse<T>> {
    return this.http.delete<GeneralResponse<T>>(`${this.apiUrl}${path}/${id}`);
  }

  //! Métodos sin genéricos
  getAll(path: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${path}`);
  }

  getById(path: string, id: number | string): Observable<any> {
    return this.http.get(`${this.apiUrl}${path}/${id}`);
  }

  store(path: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${path}`, data);
  }

  delete(path: string, id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${path}/${id}`);
  }

  update(path: string, data: any, id?: number): Observable<any> {
    return this.http.put(`${this.apiUrl}${path}`, data);
  }
}
