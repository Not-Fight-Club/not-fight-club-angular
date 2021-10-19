import { Component, OnInit, Input } from '@angular/core';
import { BetsService } from '../service/bets/bets.service';
import { Fighter } from '../interfaces/fighter';
import { Wager } from '../interfaces/wager';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {


  // These are two fighter in a fight
  @Input() fighter1!: Fighter;
  @Input() fighter2!: Fighter;


  // Wager to be sent
  wager?: Wager;

  // this will be the fighter selected to bet on
  fighter?: Fighter;
  // this is to reset fighter to bet to empty fighter for the next bet
  fighterReset?: Fighter;
  // input from the user
  input?: number;

  selected1: boolean = false;
  selected2: boolean = false;

  // inject the services in the constructor
  constructor(private betsService: BetsService) { }

  ngOnInit(): void {
  }

  // this button takes prompts the user to put a number to bet
  // and sends the selected fighter to the Bets Microservice using betsService
  activateBet() {
    let input: Number;
    // console.log(`${x} is the parsed number, and type of it is - ${typeof x}`);
    let condtition: Boolean = true;

    while (condtition) {
      let v = prompt("Please enter a number your Wager")!;
      console.log(v);
      if (v === null) {
        console.log(`input is ${this.input}`);
        break;
      }
      if (parseInt(v)) {
        this.input = parseInt(v);
        console.log(`input is ${this.input} and fighter is ${JSON.stringify(this.fighter)}`);
        break;
      }
    }
    // this is the wager object to be send to post
    if (this.fighter && this.input) {
      this.wager = {
        userId: JSON.parse(sessionStorage.getItem('user')!).userId,
        fightId: this.fighter.fightId,
        amount: this.input,
        fighterId: this.fighter.fighterId,
      };
      console.log(`This wager is being sent: ${this.fighter}`);
      // call betsService addWager method
      this.betsService.addWager(this.wager).subscribe();
      this.resetFighter();
    }
    this.selected1 = false;
    this.selected2 = false;
  }// end of activateBet() function

  doFirst() {
    this.fighter = this.fighter1;
    this.selected2 = false;
    this.selected1 = !this.selected1;
    console.log(`fighter to be send: ${JSON.stringify(this.fighter1)}`);
  }

  doSecond() {
    this.fighter = this.fighter2;
    this.selected1 = false;
    this.selected2 = !this.selected2;
    console.log(`fighter to be send: ${JSON.stringify(this.fighter2)}`);
  }

  resetFighter() {
    this.fighter = this.fighterReset;
  }

}
