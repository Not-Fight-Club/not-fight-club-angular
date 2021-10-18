import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Wager } from 'src/app/interfaces/wager';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  constructor(private http: HttpClient) { }

  // this is the url for Bets Microservice
  url: string = environment.betsApiUrl+'/api/Wagers/postbet';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // functions to make requests to the Bets Microservice
  addWager(wager: Wager): Observable<Wager> {
    console.log("addWager is working");

    return this.http.post<Wager>(`${this.url}`, wager, this.httpOptions)
      .pipe(
        tap((newWager: Wager) => console.log(`Wager is added with userId=${newWager.userId}`)),
        catchError(this.handleError<Wager>('Error on Product'))
      );
  }

  // this function retrieves the amount of payouts
  // and it takes fightId and fighterId, and returns a list of users and their payments
  getPayouts() {

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
