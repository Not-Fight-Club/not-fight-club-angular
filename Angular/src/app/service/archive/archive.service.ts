import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  constructor(private http: HttpClient) { }

  private url = environment.fightsApiUrl;
  FightList(): Observable<any> {
    return this.http.get<any>(`${this.url}/Fight/All`)
  }
}
