import { Component, OnInit, Input } from '@angular/core';
import { Vote } from '../interfaces/vote';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FightService } from '../service/fight/fight.service';
import { Fighter } from '../interfaces/fighter';
import { Fight } from '../interfaces/fight';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  notVoted: boolean = true;


  @Input() fighter1: Fighter = {
    fighterId: 0,
    fightId: 0,
    characterId: 0,
    votes: 0,
    isWinner: false
  };
  @Input() fighter2: Fighter = {
    fighterId: 0,
    fightId: 0,
    characterId: 0,
    votes: 0,
    isWinner: false
  };

  @Input() fighterName1: string = "";
  @Input() fighterName2: string = "";

  constructor(private http: HttpClient, private fightService: FightService) { }

  ngOnInit(): void {
    //this.tallyVotes(this.fighter1.fightId, this.fighter1.fighterId);
    //this.tallyVotes(this.fighter2.fightId, this.fighter2.fighterId);

    this.checkUserVote(this.fighter1.fightId, this.getUserId())
  }

  submitVote(fighter: Fighter) {
    let vote: Vote = {
      voteId: 0,
      fightId: fighter.fightId,
      fighterId: fighter.fighterId,
      userId: 0
    }
    let userStr = sessionStorage.getItem("user");
    if (!userStr) { return }
    vote.userId = JSON.parse(userStr).userId;
    this.notVoted = false;
    console.log(`You, User ${vote.userId} have voted for FIGHTER _${vote.fighterId} in fight ${vote.fightId}`);
    this.fightService.castVote(vote).subscribe();
  }

  getUserId() {
    let userStr = sessionStorage.getItem("user");
    if (!userStr) { return }
    return JSON.parse(userStr).userId;
  }

  checkUserVote(fightId: number, userId: number) {
    return this.fightService.checkUserVote(fightId, userId).subscribe((voted) => {
      console.log(voted);
      if (voted) {
        this.notVoted = false;
      }
      else {
        this.notVoted = true;
      }
    })
  }

  tallyVotes(fightId: number, fighterId: number) {
    this.fightService.tallyVotes(fightId, fighterId).subscribe((tally) => {
    console.log(`Votes for fighter ${fighterId}: ${tally}`)
    });
  }
}
