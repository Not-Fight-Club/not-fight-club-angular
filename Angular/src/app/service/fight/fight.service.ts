import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Fight } from '../../interfaces/fight';
import { Fighter } from '../../interfaces/fighter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FightService {



  constructor(private http: HttpClient) { }

  private url = 'https://localhost:5003/fight';
  private urlB = 'https://localhost:5003'

  getCurrentFight(): Observable<Fight> {
    return this.http.get<Fight>(`${this.url}/current`).pipe(map((fight:Fight) => fight));
  }

  getFightById(fightId: number): Observable<Fight> {
    console.log(fightId);
    return this.http.get<Fight>(`${this.url}/${fightId}`).pipe(map((fight: Fight) => fight));
  }

  getFighters(fightId: number): Observable<Fighter[]> {
    return this.http.get<Fighter[]>(`${this.urlB}/current/fighters/${fightId}`).pipe(map((participants: Fighter[]) => participants));
  }
  //get fights by userID
  getFightsByUserId(userID: string): Observable<Fight[]>{
    //console.log(fightId);
    return this.http.get<Fight[]>(`${this.url}/byuser/${userID}`).pipe(map((fights: Fight[]) => fights));
  }
}
