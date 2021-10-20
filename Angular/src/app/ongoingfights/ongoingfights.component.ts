import { Component, OnInit } from '@angular/core';
import { FightService } from '../service/fight/fight.service';
import { CharacterService } from '../service/character/character.service';
import { Battle, Fight } from '../interfaces/fight';
import { Fighter } from '../interfaces/fighter';
import { Character } from '../interfaces/character';

@Component({
  selector: 'app-ongoingfights',
  templateUrl: './ongoingfights.component.html',
  styleUrls: ['./ongoingfights.component.css']
})
export class OngoingfightsComponent implements OnInit {

  fights: Battle[] = [];
  fighters: Fighter[] | null = null;

  characters: Character[] = [];

  constructor(private fightService: FightService, private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getOngoingFights()
  }
  createNewFight(): void {
    window.location.href="fights/new";
  }

  getOngoingFights() {
    return this.fightService.getAllOngoingFights().subscribe(fights => {
      console.log(fights);

      this.fights = [];
      for (var i = 0; i < fights.length; i++) {
        var tempFight:Battle = { ...fights[i], fighterOne: null, fighterTwo: null, characterOne: null, characterTwo: null }
        this.getFighters(tempFight);
        console.log(tempFight);
        this.fights.push(tempFight);        
      }
    });
  }

  getOngoingFightsPrivate() {
    return this.fightService.getFightByType(false).subscribe(fights => {
      console.log(fights);

      this.fights = [];
      for (var i = 0; i < fights.length; i++) {
        var tempFight: Battle = { ...fights[i], fighterOne: null, fighterTwo: null, characterOne: null, characterTwo: null }
        this.getFighters(tempFight);
        this.fights.push(tempFight);
      }
    });
  }

  getOngoingFightsPublic() {
    return this.fightService.getFightByType(true).subscribe(fights => {
      console.log(fights);

      this.fights = [];
      for (var i = 0; i < fights.length; i++) {
        var tempFight: Battle = { ...fights[i], fighterOne: null, fighterTwo: null, characterOne: null, characterTwo: null }
        this.getFighters(tempFight);
        this.fights.push(tempFight);
      }
    });
  }

  getFighters(battle: Battle) {
    return this.fightService.getFighters(battle.fightId).subscribe(fighters => {
      console.log("Fighters: " + fighters);
      battle.fighterOne = fighters[0];
      battle.fighterTwo = fighters[1];
      if (fighters && fighters.length > 1) {
        this.getCharacter(battle, 0);
        this.getCharacter(battle, 1);
      } else {
        console.log("Error fetching fighters");
      }
    });
  }

  getCharacter(battle: Battle, fighter: number) {
    if (battle.fighterOne == null) throw new Error("Fighter One is Missing");
    if (battle.fighterTwo == null) throw new Error("Fighter Two is Missing");

    return this.characterService.GetCharacter((fighter)? battle.fighterOne.characterId : battle.fighterTwo.characterId).subscribe(character => {
      if (fighter == 0 && character != null) {
        console.log(character);
        battle.characterTwo = character;
      }
      else if (fighter == 1) {
        console.log(character);
        battle.characterOne = character;
      }
    })
  }

}
