import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from '../models/dashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private dashboardApiUrl = 'http://localhost:5000/api/dashboard';

  constructor(private http: HttpClient) {}

  getTotalUsers(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(this.dashboardApiUrl);
  }

  getTotalProducts(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(this.dashboardApiUrl);
  }

  getTotalMembers(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(this.dashboardApiUrl);
  }

  getTotalCategories(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(this.dashboardApiUrl);
  }
}
