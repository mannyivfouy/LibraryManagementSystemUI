import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../models/stock';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private stockApiUrl = 'http://localhost:5000/api/stock';

  constructor(private http: HttpClient) {}

  getAllStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.stockApiUrl);
  }

  getStockByID(id: string) {
    return this.http.get<Stock>(`${this.stockApiUrl}/${id}`);
  }

  deleteStockByID(id: string) {
    return this.http.delete(`${this.stockApiUrl}/${encodeURIComponent(id)}`);
  }

  updateStockByID(id: string, payload: string) {
    return this.http.put(
      `${this.stockApiUrl}/${encodeURIComponent(id)}`,
      payload
    );
  }

  createStock(payload: string) {
    return this.http.post(`${this.stockApiUrl}/createProduct`, payload);
  }

  uploadStockImage(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http
      .post<{ url: string }>(`${this.stockApiUrl}/upload-photo`, formData)
      .pipe(map((res) => res.url));
  }
}
