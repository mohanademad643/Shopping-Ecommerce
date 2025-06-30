import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Register } from 'src/app/Models/Auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  PostSingUpInfo(data: Register): Observable<Register> {
    return this.http.post<Register>(`${environment.apiBaseUrl}/Auth`, data);
  }

  GetAllDatauser(): Observable<Register[]> {
    return this.http.get<Register[]>(`${environment.apiBaseUrl}/Auth`);
  }

  login(user: Register): void {
    localStorage.setItem('UserToken', JSON.stringify(user));
  }
  logout(): void {
    localStorage.removeItem('UserToken');
    localStorage.clear();

  }
}
