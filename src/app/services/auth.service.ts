
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private BASE_URL = 'http://localhost:8085/api/auth';


  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/login`, { username, password })
      .pipe(
        tap(res => {
          if (res?.token) {
            localStorage.setItem('jwt-token', res.token);
          }
        })
      );
  }


  getToken(): string | null {
    return localStorage.getItem('jwt-token');
  }


  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  }


  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles || [];
  }

  isAdmin(): boolean {
    return this.getRoles().includes('ROLE_ADMIN');
  }

  isEmployee(): boolean {
    return this.getRoles().includes('ROLE_EMPLOYEE');
  }

  logout(): void {
    localStorage.removeItem('jwt-token');
    this.router.navigateByUrl('/login');
  }

  saveToken(token: string) {
    localStorage.setItem('jwt-token', token);
  }
}
