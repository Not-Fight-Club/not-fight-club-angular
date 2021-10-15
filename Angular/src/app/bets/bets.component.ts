import { Component, OnInit } from '@angular/core';
import { BetsService } from '../service/bets/bets.service';
import { Fighter } from '../interfaces/fighter';
import { Wager } from '../interfaces/wager';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {

  // These are example fighters to test
  fighter1: Fighter = {
    fighterId: 1,
    fightId: 1,
    characterId: 10,
    votes: 100,
    isWinner: false
  }

  fighter2: Fighter = {
    fighterId: 2,
    fightId: 1,
    characterId: 9,
    votes: 109,
    isWinner: true
  }

  // Wager to be send
  wager?: Wager;

  // this will be the fighter selected to bet on
  fighter?: Fighter;
  fighterReset?: Fighter;
  input?: number;


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
        // this.resetFighter();
        // console.log(`fighter after betting is reset to: ${this.fighterRest}`);
        break;
      }
      // else {
      //   alert("You did not enter a number, please enter a number");
      // }
    }
    // this is the wager object to be send to post
    if (this.fighter && this.input) {
      this.wager = {
        userId: '93ec235b-53bb-444c-8244-e3a8f8056882',
        fightId: this.fighter.fightId,
        amount: this.input,
        fighterId: this.fighter.fighterId,
      };
      console.log(`we are sending this wager: ${this.fighter}`);
      // call betsService addWager method
      this.betsService.addWager(this.wager).subscribe();
      this.resetFighter();
    }
  }// end of activateBet() function

  doFirst() {
    this.fighter = this.fighter1;
    console.log(`fighter to be send: ${JSON.stringify(this.fighter1)}`);
  }

  doSecond() {
    this.fighter = this.fighter2;
    console.log(`fighter to be send: ${JSON.stringify(this.fighter2)}`);
  }

  resetFighter() {
    this.fighter = this.fighterReset;
  }

}
