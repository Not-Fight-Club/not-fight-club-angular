import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../../interfaces/comment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommnetsService {

  constructor(private http: HttpClient) { }

  url: string = 'https://localhost:44327/api/Wagers/postbet';
  url2: string = 'https://localhost:44364/api/Comments/1';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  addCommnet(comment: Comment) {
    return this.http.post<Comment>(`${this.url}`, comment, this.httpOptions)
      .pipe(
        tap((newWager: Comment) => console.log(`Wager is added with userId=${newWager.userId}`)),
        catchError(this.handleError<Comment>('Error on Wager'))
      );
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

  getComments(): Observable<Comment[]> {
    console.log("getCommentsService");
    return this.http.get<Comment[]>(this.url2);


  }


}
