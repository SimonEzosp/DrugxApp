import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  rolCambiado = new Subject<void>();
  private apiUrl = 'https://drogxsystem-production.up.railway.app/api/v1';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post<any>(`${this.apiUrl}/auth/login`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

guardarSesion(token: string, rol: any) {
  let rolTexto = '';
  if (rol === 1) rolTexto = 'admin';
  else if (rol === 2) rolTexto = 'farmaceutico';
  else if (rol === 3) rolTexto = 'vendedor';
  
  localStorage.setItem('token', token);
  localStorage.setItem('rol', rolTexto);
  this.rolCambiado.next();
}

  getRol(): string {
    return localStorage.getItem('rol') || '';
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.rolCambiado.next();
  }
}