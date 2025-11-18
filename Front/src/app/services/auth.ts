import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUsernameSubject = new BehaviorSubject<string | null>(null);
  public currentUsername$ = this.currentUsernameSubject.asObservable();

  constructor(private http: HttpClient) {
    this.verifyUserStatus();
  }

  private verifyUserStatus() {
    this.fetchCurrentUser().subscribe();
  }

  fetchCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/me`, { responseType: 'text' }).pipe(
      tap(username => {
        this.isAuthenticatedSubject.next(true);
        this.currentUsernameSubject.next(username);
      }),
      catchError(() => {
        this.isAuthenticatedSubject.next(false);
        this.currentUsernameSubject.next(null);
        return of(null);
      })
    );
  }

  register(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, credentials);
  }

  login(credentials: any): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = `username=${encodeURIComponent(credentials.username)}&password=${encodeURIComponent(credentials.password)}`;

    return this.http.post(`${this.apiUrl}/login`, body, { headers, responseType: 'text' }).pipe(
      map(() => {
        this.fetchCurrentUser().subscribe();
        return true;
      }),
      catchError(() => {
        this.isAuthenticatedSubject.next(false);
        this.currentUsernameSubject.next(null);
        return of(false);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false);
        this.currentUsernameSubject.next(null);
      })
    );
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}

// Função de Guarda de Rota
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};
