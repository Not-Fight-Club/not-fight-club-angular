import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Fight } from '../../interfaces/fight';
import { Fighter } from '../../interfaces/fighter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Weather } from '../../interfaces/weather';
import { Location } from '../../interfaces/location';


@Injectable({
  providedIn: 'root'
})
export class FightService {



  constructor(private http: HttpClient) { }

  private url = 'http://localhost:5000/fight';
  private urlB = 'http://localhost:5000'
  private fightApiUrl = environment.fightsApiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": 'application/json'
    })
  };

  getCurrentFight(): Observable<Fight> {
    return this.http.get<Fight>(`${this.fightApiUrl}/fight/current`).pipe(map((fight: Fight) => fight));
  }

  getFightById(fightId: number): Observable<Fight> {
    console.log(fightId);
    return this.http.get<Fight>(`${this.url}/${fightId}`).pipe(map((fight: Fight) => fight));
  }

  getFighters(fightId: number): Observable<Fighter[]> {
    return this.http.get<Fighter[]>(`${this.fightApiUrl}/current/fighters/${fightId}`);
  }
  newPublicFight(publicFight: Fight): Observable<Fight[]> {
    const url = `${this.fightApiUrl}/api/fight/public`;
    return this.http.post<Fight[]>(url, publicFight, this.httpOptions);
  }
  newPrivateFight(privateFight: any): Observable<Fight[]> {
    const url = `${this.fightApiUrl}/fight/private`;
    return this.http.post<Fight[]>(url, privateFight, this.httpOptions);
  }
  getLocations(): Observable<Location[]> {
    const url = `${this.fightApiUrl}/Location/All`;
    return this.http.get<Location[]>(url);
  }
  getWeather(): Observable<Weather[]> {
    const url = `${this.fightApiUrl}/Weather/All`;
    return this.http.get<Weather[]>(url);
  }
}
