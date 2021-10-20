import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character } from '../../interfaces/character';
import { environment } from '../../../environments/environment';
import { Guid } from 'guid-typescript';
import { CharacterWithTraitandWeapon } from '../../interfaces/characterWithTraitandWeapon';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }
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

  //get all characters in the database 
  GetCharacters(): Observable<any> {
    return this.http.get(`${this.url}/api/character`);
  }

  //get all characters for a specific user in the database
  UserCharacterList(userId: Guid | null| undefined): Observable<CharacterWithTraitandWeapon[]> {
    if (userId == null || userId == undefined) {
      alert("You must be logged in to purchase a new weapon")
    }
    return this.http.get<CharacterWithTraitandWeapon[]>(`${this.url}/api/character/userCharacters/${userId}`)
  }

  //update a character with new properties
  UpdateCharacter(character: Character): Observable<Character> {
    return this.http.put<Character>(`${this.url}/api/character`, character, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'

      })
    
    })
  }


}
