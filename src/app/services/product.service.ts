import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productApiUrl = 'http://localhost:5000/api/product';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productApiUrl);
  }

  getProductByID(id: string) {
    return this.http.get<Product>(`${this.productApiUrl}/${id}`);
  }

  deleteProductByID(id: string) {
    return this.http.delete(`${this.productApiUrl}/${encodeURIComponent(id)}`);
  }

  updateProductByID(id: string, payload: string) {
    return this.http.put(
      `${this.productApiUrl}/${encodeURIComponent(id)}`,
      payload
    );
  }

  createProduct(payload: string) {
    return this.http.post(`${this.productApiUrl}/createProduct`, payload);
  }

  uploadProductImage(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http
      .post<{ url: string }>(`${this.productApiUrl}/upload-photo`, formData)
      .pipe(map((res) => res.url));
  }
}
