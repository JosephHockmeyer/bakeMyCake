import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cake } from '../models/cake';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  URL: string = 'http://localhost:3000/cakes';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Array<Cake>> {
    return this.http.get<Array<Cake>>(this.URL);
  }

  getOrder(productId: number): Observable<Cake> {
    return this.http.get<Cake>(`${this.URL}/${productId}`);
  }

  addOrder(cake: Cake): Observable<Array<Cake>> {
    return this.http.post<Array<Cake>>(this.URL, cake);
  }

  editOrder(productId: number, cake: Cake): Observable<Cake> {
    return this.http.put<Cake>(`${this.URL}/${productId}`, cake);
  }

  deleteOrder(productId: number) {
    return this.http.delete<Cake>(`${this.URL}/${productId}`);
  }
}
