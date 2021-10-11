import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Weapon } from '../../interfaces/weapon';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  constructor(private http: HttpClient) { }

  private thirdPartyurl = 'https://random-word-form.herokuapp.com/random/noun';
  //private url = 'http://localhost:5000';
  private url = environment.charactersApiUrl;


  RandomWeapon() {
    return this.http.get(this.thirdPartyurl);
  }

  PostWeapon(weapon: Weapon) {
    return this.http.post<Weapon>(`${this.url}/api/Weapon`, weapon, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  getWeaponById(id: number): Observable<Weapon> {
    return this.http.get<Weapon>(`${this.url}/Weapon/` + id).pipe(map((trait: Weapon) => trait))
  }

}
