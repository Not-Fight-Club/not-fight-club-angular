import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Weather } from 'src/app/interfaces/weather';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
   constructor(private http: HttpClient) { 
  
  }
  
  private url = environment.fightsApiUrl;
  //get weathers 

  getWeathers():Observable<Weather[]> {
    return this.http.get<Weather[]>(`${this.url}/weather/all`);
  }

}
