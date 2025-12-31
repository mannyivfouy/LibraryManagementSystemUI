import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';

export interface UsersResponse {
  message: string;
  users: User[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_URL = 'http://localhost:5000';
  private userApiUrl = `${this.BASE_URL}/api/users`;

  constructor(private http: HttpClient) {}

  // 🔹 Normalize image URL
  // private normalizeUser(user: User): User {
  //   return {
  //     ...user,
  //     imageUrl: user.imageUrl
  //       ? `${this.BASE_URL}${user.imageUrl}`
  //       : `${this.BASE_URL}/uploads/userImages/default.png`,
  //   };
  // }

  private normalizeUser(user: User): User {
    let imageUrl = user.imageUrl;

    if (!imageUrl) {
      imageUrl = '/uploads/userImages/default.png';
    }

    // ✅ If already full URL, keep it
    if (imageUrl.startsWith('http')) {
      return { ...user, imageUrl };
    }

    // ✅ Ensure single BASE_URL
    return {
      ...user,
      imageUrl: `${this.BASE_URL}${imageUrl}`,
    };
  } 

  getAllUsers(): Observable<User[]> {
    return this.http
      .get<UsersResponse>(this.userApiUrl)
      .pipe(map((res) => res.users.map((user) => this.normalizeUser(user))));
  }

  getUserByID(id: string): Observable<User> {
    return this.http
      .get<User>(`${this.userApiUrl}/${id}`)
      .pipe(map((user) => this.normalizeUser(user)));
  }

  deleteUserByID(id: string) {
    return this.http.delete(`${this.userApiUrl}/${encodeURIComponent(id)}`);
  }

  updateUserByID(id: string, payload: any) {
    return this.http.put(
      `${this.userApiUrl}/${encodeURIComponent(id)}`,
      payload
    );
  }

  createUser(payload: any) {
    return this.http.post(`${this.userApiUrl}/createUser`, payload);
  }

  uploadAvater(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.http
      .post<{ url: string }>(`${this.userApiUrl}/upload-photo`, formData)
      .pipe(
        map((res) =>
          res.url.startsWith('http') ? res.url : `${this.BASE_URL}${res.url}`
        )
      );
  }
}
