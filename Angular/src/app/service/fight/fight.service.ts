import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Fight } from '../../interfaces/fight';
import { Fighter } from '../../interfaces/fighter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Vote } from '../../interfaces/vote';
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
    return this.http.get<Fight>(`${this.fightApiUrl}/fight/current`).pipe(map((fight: Fight) => fight));
  }

  getFightById(fightId: number): Observable<Fight> {
    console.log(fightId);
    return this.http.get<Fight>(`${this.fightApiUrl}/fight/${fightId}`).pipe(map((fight: Fight) => fight));
  }

  getFighters(fightId: number): Observable<Fighter[]> {
    return this.http.get<Fighter[]>(`${this.fightApiUrl}/current/fighters/${fightId}`).pipe(map((participants: Fighter[]) => participants));
  }

  castVote(vote: Vote): Observable<Vote> {
    return this.http.post<Vote>(`${this.fightApiUrl}/vote`, vote);
  }

  tallyVotes(fightId: number, fighterId: number): Observable<number> { 
    return this.http.get<number>(`${this.fightApiUrl}/votes/${fightId}/${fighterId}`);
  }
  //get fights by userID
  getFightsByUserId(userID: string): Observable<Fight[]>{
    //console.log(fightId);
    return this.http.get<FightWithCharacter[]>(`${this.url}/byuser/${userID}`).pipe(map((fights: FightWithCharacter[]) => fights));
  }
}
