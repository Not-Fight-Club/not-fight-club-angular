import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Fight } from '../../interfaces/fight';
import { Fighter } from '../../interfaces/fighter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Weather } from '../../interfaces/weather';
import { Location } from '../../interfaces/location';
import { Vote } from '../../interfaces/vote';
import { FightWithCharacter } from 'src/app/interfaces/fightWithCharacter';


@Injectable({
  providedIn: 'root'
})
export class FightService {



  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": 'application/json'
    })
  };

  private fightApiUrl = environment.fightsApiUrl;
  private url = `${this.fightApiUrl}/fight`;
  getCurrentFight(): Observable<Fight> {
    return this.http.get<Fight>(`${this.fightApiUrl}/fight/current`).pipe(map((fight: Fight) => fight));
  }

  getAllOngoingFights(): Observable<Fight[]> {
    return this.http.get<Fight[]>(`${this.fightApiUrl}/fight/ongoing`);
  }

  getFightById(fightId: number): Observable<Fight> {
    console.log(fightId);
    return this.http.get<Fight>(`${this.fightApiUrl}/fight/${fightId}`).pipe(map((fight: Fight) => fight));
  }

  getFightByType(fightType: boolean): Observable<Fight[]> {
    console.log(fightType);
    return this.http.get<Fight[]>(`${this.fightApiUrl}/fight/allbyFightType/${fightType}`);
  }

  castVote(vote: Vote): Observable<Vote> {
    return this.http.post<Vote>(`${this.fightApiUrl}/vote`, vote);
  }

  checkUserVote(fightId: number, userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.fightApiUrl}/uservote/${fightId}/${userId}`);
  }

  tallyVotes(fightId: number, fighterId: number): Observable<number> {
    return this.http.get<number>(`${this.fightApiUrl}/votes/${fightId}/${fighterId}`);
  }
  getFighters(fightId: number): Observable<Fighter[]> {
    return this.http.get<Fighter[]>(`${this.fightApiUrl}/current/fightersByFightId/${fightId}`);
  }
  newPublicFight(publicFight: any): Observable<Fight[]> {
    const url = `${this.fightApiUrl}/fight/public`;
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
  getLocation(location: string | null): Observable<Location> | null {
    const url = `${this.fightApiUrl}/Location/${location}`
    return this.http.get<Location>(url);
  }
  addLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(`${this.fightApiUrl}/location`, location, this.httpOptions);
  }

  getWeather(): Observable<Weather[]> {
    const url = `${this.fightApiUrl}/Weather/All`;
    return this.http.get<Weather[]>(url);
  }
  getSingleWeather(weather: string | null): Observable<Weather> | null {
    const url = `${this.fightApiUrl}/Weather/${weather}`
    return this.http.get<Weather>(url);
  }
  addWeather(weather: Weather): Observable<Weather> {
    return this.http.post<Weather>(`${this.fightApiUrl}/weather`, weather, this.httpOptions);
  }
  //get fights by userID
  /*
  getFightsByUserId(userID: string): Observable<Fight[]>{
    //console.log(fightId);
    return this.http.get<FightWithCharacter[]>(`${this.url}/byuser/${userID}`).pipe(map((fights: FightWithCharacter[]) => fights));
  }
  */
}
