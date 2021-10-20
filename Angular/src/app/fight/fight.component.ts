import { Component, OnInit } from '@angular/core';

import { Fight } from '../interfaces/fight';
import { Fighter } from '../interfaces/fighter';
import { Trait } from '../interfaces/trait';
import { TraitService } from '../service/trait/trait.service';
import { FightService } from '../service/fight/fight.service';
import { CharacterService } from '../service/character/character.service';
import { WeaponService } from '../service/weapon/weapon.service';
import { Character } from '../interfaces/character';
import { Weapon } from '../interfaces/weapon';
import { TimerComponent } from '../timer/timer.component';
//ADD ACTIVATED ROUTE 
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {

  result: string = "";

  fight: Fight | null = null;
  fighters: Fighter[] = [];

  characters: Character[] = [];
  traits: Trait[] = [];
  weapons: Weapon[] = [];

  endTime: Date = new Date();

  fighter1Votes: number = 0;
  fighter2Votes: number = 0;
  //winner: string = "";

  constructor(  private route: ActivatedRoute,
    private router: Router,private fightService: FightService, private characterService: CharacterService, private traitService: TraitService, private weaponService: WeaponService) { }

  ngOnInit(): void {
    //this.getCurrentFight()
  this.route.paramMap.pipe(
      switchMap(
        (params: ParamMap) =>
          this.fightService.getFightById(parseInt(params.get('fightId')!))
      )
    ).subscribe(x=>{
      this.fight=x;
      this.getFighters(this.fight.fightId);
      this.endTime = this.fight.endDate;
      //alert(this.endTime);
    });

    /*
    setTimeout(() => {
      if (this.fight?.fightId != null) {
        this.getFighters(this.fight.fightId);
      }
      else {
        console.log("We got a problem.")
      }
    }, 1000)

    setTimeout(() => {
      if (this.fighters != null) {
        this.getCharacter(this.fighters[0].characterId, 0);
      }
      else {
        console.log("We got another problem.");
      }
    }, 2000)

    setTimeout(() => {
      if (this.fighters != null) {
        this.getCharacter(this.fighters[1].characterId, 1);
      }
      else {
        console.log("We got another problem.");
      }
    }, 3000)

    setTimeout(() => {
      this.getTrait(this.characters[0].traitId, 0);
    }, 4000)

    setTimeout(() => {
      this.getTrait(this.characters[1].traitId, 1);
    }, 5000)

    setTimeout(() => {
      this.getWeapon(this.characters[0].weaponId, 0);
    }, 6000)

    setTimeout(() => {
      this.getWeapon(this.characters[1].weaponId, 1);
    }, 7000)

    */
  }
/*
  getCurrentFight() {
    return this.fightService.getCurrentFight().subscribe(fight => {
      console.log(fight);
      this.fight = fight;
      this.getFighters(fight.fightId);
    });
  }
*/
  getFighters(fightId: number) {
    return this.fightService.getFighters(fightId).subscribe(fighters => {
      console.log(fighters);
      this.fighters = fighters;
      if (fighters && fighters.length > 1) {
        this.getCharacter(fighters[0].characterId, 0);
        this.getCharacter(fighters[1].characterId, 1);
      } else {
        console.log("Error fetching fighters");
      }
    });
  }

  getCharacter(charId: number, fighter: number) {
    return this.characterService.GetCharacter(charId).subscribe(character => {
      if (fighter == 0 && character != null) {
        console.log(character);
        this.characters.push(character);
        this.getTrait(character.traitId, 0);
        this.getWeapon(character.weaponId, 0);
      }
      else if (fighter == 1) {
        console.log(character);
        this.characters.push(character);
        this.getTrait(character.traitId, 1);
        this.getWeapon(character.weaponId, 1);
      }
    })
  }

  getTrait(traitId: number, fighter: number) {
    return this.traitService.getTraitById(traitId).subscribe(trait => {
      if (fighter == 0) {
        console.log(trait);
        this.traits.push(trait);
      }
      else if (fighter == 1) {
        console.log(trait);
        this.traits.push(trait);
      }

    })
  }

  getWeapon(weaponId: number, fighter: number) {
    return this.weaponService.getWeaponById(weaponId).subscribe(weapon => {
      if (fighter == 0) {
        console.log(weapon);
        this.weapons.push(weapon);
      }
      else if (fighter == 1) {
        console.log(weapon);
        this.weapons.push(weapon);
      }
    })
  }

  tallyVotes() {
    if (this.fight == null) {
      throw new Error("fight null");
    }
    let fightId = this.fight.fightId;
    let fighter1 = this.fighters[0].fighterId;
    let fighter2 = this.fighters[1].fighterId;
    this.fightService.tallyVotes(fightId, fighter1).subscribe((votes) => this.fighter1Votes = votes);
    this.fightService.tallyVotes(fightId, fighter2).subscribe((votes) => this.fighter2Votes = votes);

    forkJoin({
      fighter1Votes: this.fightService.tallyVotes(fightId, fighter1),
      fighter2Votes: this.fightService.tallyVotes(fightId, fighter2)
    })
      .subscribe(({ fighter1Votes, fighter2Votes }) => {
        this.fighter1Votes = fighter1Votes;
        this.fighter2Votes = fighter2Votes;
        this.result = this.printResult();
      })
  }

  printResult() {
    if (this.fighter1Votes > this.fighter2Votes) {
      this.fighters[0].isWinner = true;
      return "The winner of this battle is: " + this.characters[0].name;
    }
    else if (this.fighter2Votes > this.fighter1Votes) {
      this.fighters[1].isWinner = true;
      return "The winner of this battle is: " + this.characters[1].name;
    }
    else {
      return "The battle ended in a tie."
    }
  }
}
