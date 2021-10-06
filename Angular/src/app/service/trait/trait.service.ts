
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Trait } from '../../interfaces/trait';

@Injectable({
  providedIn: 'root'
})
export class TraitService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:5000';
  //create functions for http requests

  TraitList(): Observable<Trait[]> {
    return this.http.get<Trait[]>(`${this.url}/api/trait`)
  }


  getTraitById(id: number): Observable<Trait> {
    return this.http.get<Trait>(`${this.url}/Trait/` + id).pipe(map((trait: Trait) => trait))
  }

  AddTrait(trait: Trait): Observable<Trait> {
    console.log('Making call to controller:')
    console.log(trait);

    return this.http.post<Trait>(`${this.url}/api/Trait`, trait, {

      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })

    })
      .pipe(catchError(this.handleError<Trait>('add new Trait', trait)));
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
