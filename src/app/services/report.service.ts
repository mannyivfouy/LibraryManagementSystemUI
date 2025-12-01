import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private reportApiUrl = 'http://localhost:5000/api/report';

  constructor(private http: HttpClient) {}

  getAllReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.reportApiUrl);
  }

  getReportByID(id: string) {
    return this.http.get<Report>(`${this.reportApiUrl}/${id}`);
  }

  deleteReportByID(id: string) {
    return this.http.delete(`${this.reportApiUrl}/${encodeURIComponent(id)}`);
  }  
}
