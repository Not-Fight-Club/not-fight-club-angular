import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Product } from '../../interfaces/product';
import { User } from '../../interfaces/user';
import { UserR } from '../../interfaces/userR';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  private url = environment.productsApiUrl;
  ProductList(user: User): Observable<any> {
    //get user data from calling ts
    console.log(user.userId);
    return this.http.get<any>(`${this.url}/api/UserProduct/PreviousPurchases/${user.userId}`)
  }

  AddProduct(product: Product): Observable<Product> {

    console.log(product);
    return this.http.post<Product>(`${this.url}/api/Product`, product, {

      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })

    })
      .pipe(catchError(this.handleError<Product>('add new Product', product)));

    //make a call to the userproduct controller to add the user info to the db
    //this can only be done after the product is in the db

    
  }

  AddUserProduct(dbProduct: Product){
    //get userId from session storage
    let sessionUser = sessionStorage.getItem('user');
    if (sessionUser != null) {
      
      let userId = JSON.parse(sessionUser).userId;
      console.log(`Got the userId and should be making call to userProduct controller: ${userId}`)
      /*let userId = '3980E6CB-DFEA - 423E-99D9 - 6BF852E23664';*/
      return this.http.post<Product>(`${this.url}/api/userProduct/${userId}`, dbProduct, {

        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })

      })
        .pipe(catchError(this.handleError<Product>('add new user Product', dbProduct)))
    }
    else return;
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
