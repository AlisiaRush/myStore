import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  private baseURL = 'https://dummyjson.com/products';

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseURL);
  }
}
