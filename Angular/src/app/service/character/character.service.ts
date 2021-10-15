import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character } from '../../interfaces/character';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }
  //private url = 'http://localhost:5000';
  private url = environment.charactersApiUrl;

  CreateCharacter(character: Character) {
    //post the character to db
    return this.http.post<Character>(`${this.url}/api/character`, character, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'

      })
    })
  }

  GetCharacter(charId: number): Observable<Character> {
    return this.http.get<Character>(`${this.url}/api/character/${charId}`).pipe(map((character: Character) => character));
  }

  GetCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.url}/api/character`);
  }
}
