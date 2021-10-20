import { Component, OnInit } from '@angular/core';
import { BucksService } from '../service/bucks/bucks.service';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private bucksService: BucksService, private userService: UserService) { }
  showFirst: boolean = true;
  loggedin = false;
  reward: number = 0;



  ngOnInit(): void {
    this.CheckUser();
  }

  CheckUser() {
    if (sessionStorage.getItem('user') != null) {
      this.loggedin = true;
    }
    else {
      this.loggedin = false;
    }
    return this.loggedin;
  }

  GetReward() {
    let userFromSession = sessionStorage.getItem('user');
    console.log('getting reward')
    if (!userFromSession) {
      return
    } else {
      let currentUser = JSON.parse(userFromSession);
      this.bucksService.GetReward(currentUser)
        .subscribe(reward => {

          this.reward = reward;
          if (reward != -1) {
            window.alert(`You have collected ${this.reward} !Bucks!!!!!!!!`)
          }
          else
            window.alert('You have already collected a reward!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! (smiley face)')
          currentUser.bucks = currentUser.bucks + this.reward;
          console.log(currentUser.bucks);
        })

      this.userService.editProfile(currentUser.userId, currentUser).subscribe(obj => {
        sessionStorage.setItem('user', JSON.stringify(obj));
      });
    }

  }

  Toggle() {
    this.showFirst = false;
  }

}
