import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../../interfaces/user';
import { Observable, of } from 'rxjs';
import { Guid } from 'guid-typescript';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BucksService {

  private url = environment.usersApiUrl;

  constructor(private router: Router, private userService: UserService, private http: HttpClient) { }

  //Adjust the number of bucks a user has. The changeBucks can be positive or negative.
  adjustBucks(changeBucks: number): Observable<boolean> {
    //get the user
    let userString = sessionStorage.getItem('user');
    //checks if the user is null and returns false if it's null
    if (userString === null) {
      alert("You are not logged in.");
      return of(false);
    }
    let user = JSON.parse(userString);
    //Adjusts the user's bucks
    user.bucks += changeBucks;

    this.userService.editProfile(user.userId, user).subscribe(obj => {
      sessionStorage.setItem('user', JSON.stringify(obj));
    });
    return of(true);
  }

  GetReward(user: User): Observable<number> {
    return this.http.post<number>(`${this.url}/GetReward`, user)
  }
}
