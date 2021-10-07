import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  activateBet() {

    let v = prompt("Please Enter your Wager", "0");


    alert(v);

  }

}
