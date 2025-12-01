import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiUrl = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl);
  }

  getUserByID(id: string) {
    return this.http.get<User>(`${this.userApiUrl}/${id}`);
  }

  deleteUserByID(id: string) {
    return this.http.delete(`${this.userApiUrl}/${encodeURIComponent(id)}`);
  }

  updateUserByID(id: string, payload: string) {
    return this.http.put(
      `${this.userApiUrl}/${encodeURIComponent(id)}`,
      payload
    );
  }

  createUser(payload: string) {
    return this.http.post(`${this.userApiUrl}/createUser`, payload);
  }

  uploadAvater(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http
      .post<{ url: string }>(`${this.userApiUrl}/upload-photo`, formData)
      .pipe(map((res) => res.url));
  }
}
