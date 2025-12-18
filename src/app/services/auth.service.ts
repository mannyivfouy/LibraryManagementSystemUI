import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

interface LoginResponse {
  message: string;
  user: {
    id: string;
    username: string;
    role: string;
    imageUrl: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}
  // login and store user info in localStorage
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((res: LoginResponse) => {          
          localStorage.setItem('userId', res.user.id);
          localStorage.setItem('username', res.user.username);
          localStorage.setItem('role', res.user.role);
          localStorage.setItem('imageUrl', res.user.imageUrl);
        })
      );
  }

  // check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  // logout and remove localStorage info
  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('imageUrl');

    // redirect to login
    window.location.href = '/login';
  }
}
