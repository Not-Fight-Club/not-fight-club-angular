import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Fight } from '../../interfaces/fight';
import { Fighter } from '../../interfaces/fighter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FightWithCharacter } from 'src/app/interfaces/fightWithCharacter';

@Injectable({
  providedIn: 'root'
})
export class FightService {



  constructor(private http: HttpClient) { }


  //private urlB = 'https://localhost:5003'

  private fightApiUrl = environment.fightsApiUrl;
  private url = `${this.fightApiUrl}/fight`;
  getCurrentFight(): Observable<Fight> {
    return this.http.get<Fight>(`${this.fightApiUrl}/fight/current`).pipe(map((fight:Fight) => fight));
  }

  getAllOngoingFights(): Observable<Fight[]> {
    return this.http.get<Fight[]>(`${this.fightApiUrl}/fight/ongoing`);
  }

  getFightById(fightId: number): Observable<Fight> {
    console.log(fightId);
    return this.http.get<Fight>(`${this.url}/${fightId}`).pipe(map((fight: Fight) => fight));
  }

  getFightByType(fightType: boolean): Observable<Fight[]> {
    console.log(fightType);
    return this.http.get<Fight[]>(`${this.fightApiUrl}/fight/allbyFightType/${fightType}`);
  }

  getFighters(fightId: number): Observable<Fighter[]> {
    return this.http.get<Fighter[]>(`${this.fightApiUrl}/current/fightersByFightID/${fightId}`);
  }
  //get fights by userID
  getFightsByUserId(userID: string): Observable<Fight[]>{
    //console.log(fightId);
    return this.http.get<FightWithCharacter[]>(`${this.url}/byuser/${userID}`).pipe(map((fights: FightWithCharacter[]) => fights));
  }
}
