import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../../interfaces/user';
import { Observable, of } from 'rxjs';
import { Guid } from 'guid-typescript';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BucksService {

  private url = 'https://localhost:5001'

  constructor(private router: Router, private userService: UserService, private http: HttpClient) { }

  //Adjust the number of bucks a user has. The changeBucks can be positive or negative.
  adjustBucks(changeBucks: number): Observable<boolean> {
    //get the user
    let userString: string | null = sessionStorage.getItem('user');
    //checks if the user is null and returns false if it's null
    if (userString === null) {
      alert("You are not logged in.");
      return of(false);
    }
    //changes the user to a user object
    let user: User = JSON.parse(userString);
    //Adjusts the user's bucks
    user.bucks += changeBucks;
    //checks if the user's bucks is less than 20 and returns false if less than 20 bucks are left.
    //this should check if the user's bucks is less than the cost of the item not 20
    if (user.bucks < 20) {
      alert("Sorry, but you can't afford this.");
      return of(false);
    }

    //How do I make it so that the user's data is updated in the database?
    //this.userService.editProfile(Guid.create(), user).subscribe(user => console.log(user.bucks));

    //turns the user object back into a string
    userString = JSON.stringify(user);
    //the user is added back to session storage
    sessionStorage.setItem('user', userString);
    //true is returned
    return of(true);
  }

  GetReward(user: User): Observable<number> {
    return this.http.post<number>(`${this.url}/GetReward`, user)
  }
}
