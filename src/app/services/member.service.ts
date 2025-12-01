import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private memberApiUrl = 'http://localhost:5000/api/member';

  constructor(private http: HttpClient) {}

  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.memberApiUrl);
  }

  getMemberByID(id: string) {
    return this.http.get<Member>(`${this.memberApiUrl}/${id}`);
  }

  deleteMemberByID(id: string) {
    return this.http.delete(`${this.memberApiUrl}/${encodeURIComponent(id)}`);
  }

  updateMemberByID(id: string, payload: string) {
    return this.http.put(
      `${this.memberApiUrl}/${encodeURIComponent(id)}`,
      payload
    );
  }

  createMember(payload: string) {
    return this.http.post(`${this.memberApiUrl}/createMember`, payload);
  }
}
