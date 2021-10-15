import { Component, OnInit } from '@angular/core';
import { BucksService } from '../service/bucks/bucks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private bucksService: BucksService) { }
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
    let id = sessionStorage.getItem('user');
    console.log('getting reward')
    if (!userFromSession) {
      return
    } else {
      let currentUser = JSON.parse(userFromSession);
      this.bucksService.GetReward(currentUser)
        .subscribe(reward => { this.reward = reward; window.alert(`You have collected ${this.reward} !Bucks!!!!!!!!`) })

    }

  }

  Toggle() {
    this.showFirst = false;
  }

}
