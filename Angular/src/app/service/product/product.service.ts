import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { UserProduct } from 'src/app/interfaces/userProduct';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  private url = environment.shopsApiUrl;

  productList(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/api/product`)
  }

  getProductById(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.url}/api/product/`+ id)
  }

  buyProduct(id: Guid, product: Product): Observable<UserProduct>{
    console.log(id);
    return this.http.post<UserProduct>(`${this.url}/api/userproduct/${id}`, product, {

      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })

    })
  }
}
