import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:5000'
  FightList(): Observable<any> {
    return this.http.get<any>(`${this.url}/Fight/All`)
  }
}
