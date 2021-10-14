import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Fight } from '../../interfaces/fight';
import { Fighter } from '../../interfaces/fighter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Vote } from '../../interfaces/vote';

@Injectable({
  providedIn: 'root'
})
export class FightService {



  constructor(private http: HttpClient) { }

  private url = 'http://localhost:5000/fight';
  private urlB = 'http://localhost:5000'
  private fightApiUrl = environment.fightsApiUrl;

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
}
