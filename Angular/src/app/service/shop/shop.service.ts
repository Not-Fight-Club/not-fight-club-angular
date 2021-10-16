import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserR } from '../../interfaces/userR';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  ProductList(user: UserR): Observable<any> {
    //get user data from calling ts
    console.log(user.userId);
    return this.http.get<any>(environment.shopApiUrl+`/api/UserProduct/PreviousPurchases/${user.userId}`)
  }
}
