import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { UserR } from '../../interfaces/userR';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  private url = 'https://localhost:5007'
  ProductList(user: User): Observable<any> {
    //get user data from calling ts
    console.log(user.userId);
    return this.http.get<any>(`${this.url}/api/UserProduct/PreviousPurchases/${user.userId}`)
  }
}
