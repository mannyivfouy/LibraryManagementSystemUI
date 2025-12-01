import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryApiUrl = 'http://localhost:5000/api/category';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryApiUrl);
  }

  getCategoryByID(id: string) {
    return this.http.get<Category>(`${this.categoryApiUrl}/${id}`);
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.categoryApiUrl}/${encodeURIComponent(id)}`);
  }

  updateCategoryByID(id: string, payload: string) {
    return this.http.put(
      `${this.categoryApiUrl}/${encodeURIComponent(id)}`,
      payload
    );
  }

  createMember(payload: string) {
    return this.http.post(`${this.categoryApiUrl}/createCategory`, payload);
  }
}
