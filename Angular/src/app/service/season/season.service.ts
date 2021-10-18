import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Season } from 'src/app/interfaces/season';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor(private http: HttpClient) { }

  private seasonApiUrl = environment.shopApiUrl;
  private url = `${this.seasonApiUrl}/api/Season`;

  getCurrentSeason(): Observable<Season> {
    return this.http.get<Season>(`${this.url}/now`).pipe(map((season: Season) => season))
  }
}
