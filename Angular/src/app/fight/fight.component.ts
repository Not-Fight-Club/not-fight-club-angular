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

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {



  fight: Fight | null = null;
  fighters: Fighter[] = [];

  characters: Character[] = [];
  traits: Trait[] = [];
  weapons: Weapon[] = [];

  constructor(private fightService: FightService, private characterService: CharacterService, private traitService: TraitService, private weaponService: WeaponService) { }

  ngOnInit(): void {
    this.getCurrentFight()

    setTimeout(() => {
      if (this.fight?.fightId != null) {
        this.getFighters(this.fight.fightId);
      }
      else {
        console.log("We got a problem.")
      }
    }, 1000)

    //setTimeout(() => {
    //  if (this.fighters != null) {
    //    this.getCharacter(this.fighters[0].characterId, 0);
    //  }
    //  else {
    //    console.log("We got another problem.");
    //  }
    //}, 2000)

    //setTimeout(() => {
    //  if (this.fighters != null) {
    //    this.getCharacter(this.fighters[1].characterId, 1);
    //  }
    //  else {
    //    console.log("We got another problem.");
    //  }
    //}, 3000)

    //setTimeout(() => {
    //  this.getTrait(this.characters[0].traitId, 0);
    //}, 4000)

    //setTimeout(() => {
    //  this.getTrait(this.characters[1].traitId, 1);
    //}, 5000)

    //setTimeout(() => {
    //  this.getWeapon(this.characters[0].weaponId, 0);
    //}, 6000)

    //setTimeout(() => {
    //  this.getWeapon(this.characters[1].weaponId, 1);
    //}, 7000)


  }

  getCurrentFight() {
    return this.fightService.getCurrentFight().subscribe(fight => {
      console.log(fight);
      this.fight = fight;
    });
  }

  getFighters(fightId: number) {
    return this.fightService.getFighters(fightId).subscribe(fighters => {
      console.log(fighters);
      this.fighters = fighters;
    });
  }

  getCharacter(charId: number, fighter: number) {
    return this.characterService.GetCharacter(charId).subscribe(character => {
      if (fighter == 0 && character != null) {
        console.log(character);
        this.characters.push(character);
      }
      else if (fighter == 1) {
        console.log(character);
        this.characters.push(character);
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
}
