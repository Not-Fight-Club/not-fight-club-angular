import { Component, OnInit, Input } from '@angular/core';
import { Vote } from '../interfaces/vote';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FightService } from '../service/fight/fight.service';
import { Fighter } from '../interfaces/fighter';
import { Fight } from '../interfaces/fight';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  fighter1: Fighter = {
    fighterId: 1,
    fightId: 1,
    characterId: 1,
    isWinner: false
  };
  fighter2: Fighter = {
    fighterId: 2,
    fightId: 1,
    characterId: 2,
    isWinner: false
  };

  constructor(private http: HttpClient, private fightService: FightService) { }

  ngOnInit(): void {
  }

  submitVote(fighter: Fighter) {
    let vote: Vote = {
      voteId: 0,
      fightId: fighter.fightId,
      fighterId: fighter.fighterId,
      userId: Math.floor(Math.random() * 100)
    }
    console.log(`You, User ${vote.userId} have voted for FIGHTER _${vote.fighterId} in fight ${vote.fightId}`);
    this.fightService.castVote(vote).subscribe();
  }
}
