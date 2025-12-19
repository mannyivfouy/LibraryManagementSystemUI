// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { User } from '../models/user';
// import { map } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private readonly BASE_URL = 'http://localhost:5000';
//   private userApiUrl = `${this.BASE_URL}/api/user`;

//   constructor(private http: HttpClient) {}

//   // 🔹 Normalize image URL
//   private normalizeUser(user: User): User {
//     return {
//       ...user,
//       imageUrl: user.imageUrl
//         ? `${this.BASE_URL}${user.imageUrl}`
//         : `${this.BASE_URL}/uploads/userImages/default.png`,
//     };
//   }

//   getAllUsers(): Observable<User[]> {
//     return this.http.get<User[]>(this.userApiUrl);
//   }

//   getUserByID(id: string) {
//     return this.http.get<User>(`${this.userApiUrl}/${id}`);
//   }

//   deleteUserByID(id: string) {
//     return this.http.delete(`${this.userApiUrl}/${encodeURIComponent(id)}`);
//   }

//   updateUserByID(id: string, payload: string) {
//     return this.http.put(
//       `${this.userApiUrl}/${encodeURIComponent(id)}`,
//       payload
//     );
//   }

//   createUser(payload: string) {
//     return this.http.post(`${this.userApiUrl}/createUser`, payload);
//   }

//   uploadAvater(file: File) {
//     const formData = new FormData();
//     formData.append('avatar', file);
//     return this.http
//       .post<{ url: string }>(`${this.userApiUrl}/upload-photo`, formData)
//       .pipe(map((res) => res.url));
//   }
// }





import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly BASE_URL = 'http://localhost:5000';
  private userApiUrl = `${this.BASE_URL}/api/user`;

  constructor(private http: HttpClient) {}

  // 🔹 Normalize image URL
  private normalizeUser(user: User): User {
    return {
      ...user,
      imageUrl: user.imageUrl
        ? `${this.BASE_URL}${user.imageUrl}`
        : `${this.BASE_URL}/uploads/userImages/default.png`,
    };
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl).pipe(
      map(users => users.map(user => this.normalizeUser(user)))
    );
  }

  getUserByID(id: string): Observable<User> {
    return this.http.get<User>(`${this.userApiUrl}/${id}`).pipe(
      map(user => this.normalizeUser(user))
    );
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
        map(res =>
          res.url.startsWith('http')
            ? res.url
            : `${this.BASE_URL}${res.url}`
        )
      );
  }
}
