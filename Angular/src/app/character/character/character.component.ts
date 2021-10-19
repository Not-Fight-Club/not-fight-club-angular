import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Trait } from 'src/app/interfaces/trait';
import { UserR } from 'src/app/interfaces/userR';
import { Weapon } from 'src/app/interfaces/weapon';
import { CharacterService } from 'src/app/service/character/character.service';
import { TraitService } from 'src/app/service/trait/trait.service';
import { WeaponService } from 'src/app/service/weapon/weapon.service';
import { Character } from '../../interfaces/character';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {


  constructor(private traitService: TraitService, private weaponService: WeaponService, private characterService: CharacterService, private router: Router) { }

  user!: UserR | null;


  traitList: Trait[] = [];
  weaponName = "What weapon will you get?";

  ngOnInit(): void {
    //get all the traits available and put them in a list
    // check user-list for example
    this.traitService.TraitList().subscribe(x => {
      this.traitList = x
      //get user from session storage

    })
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser === null) {
      console.log('Error Occurred')
    } else {
      let returnedUser: UserR = JSON.parse(sessionUser);
      if (returnedUser.userId == null) {
        console.log('Error Occurred')
      } else {
        this.character.userId = returnedUser.userId;
      }
    }
  }


  //create a character to hold the information the user picks
  character: Character = {
    characterId: 0,
    name: "Your Epic Character!",
    level: null,
    wins: null,
    losses: null,
    ties: null,
    baseform: "",

    userId: Guid.create(),
    traitId: 0,
    weaponId: 0
  };



  onSubmitBaseForm(baseform: NgForm) {
    //add base form to the character being created

    //add character name to the character being created
    this.character.name = baseform.value.charactername;

    this.character.baseform = baseform.value.baseform;
    //console.log(`list of traits: ${this.traitList}`)
  }

  SubmitTrait(traitId: number) {
    //set the character's trait id
    //make a small change to repush
    this.character.traitId = traitId;
  }

  SubmitCharacter() {
    //call to services to post character
    let OCharacter = this.characterService.CreateCharacter(this.character)
    OCharacter.subscribe(character => {
      console.log('You made a character!');
      alert('You Made A Character!');
      this.router.navigateByUrl('/fight');

    })
    console.log('This is the full character')
    console.log(this.character)
  }



  async SubmitWeapon() {
    //get a weapon from the 3rd party api
    let OWeapon = await this.weaponService.RandomWeapon();
    OWeapon.subscribe(item => {
      let weapon: Weapon = { weaponId: 0, description: item[0] }
      sessionStorage.setItem('weapon', JSON.stringify(weapon))
    })
    //save the weapon to our db
    //wait before trying to retrieve the item from storage
    setTimeout(async () => {
      var OWeapon = this.RetrievefromSession();
      console.log(`weapon from session storage: ${OWeapon}`)
      if (OWeapon == null) {
        //try to grab it again
        OWeapon = this.RetrievefromSession();
      }
      else {
        console.log(OWeapon.description[0])
        console.log(OWeapon.weaponId)
        let weaponFull: Weapon = { weaponId: OWeapon.weaponId, description: OWeapon.description[0] }
        var dbWeapon = await this.weaponService.PostWeapon(weaponFull);
        dbWeapon.subscribe(weapon => { localStorage.setItem('weapon', JSON.stringify(weapon)) })
        console.log(`weapon from db: ${dbWeapon}`)
      }
    }, 2000);
    //retrieve the weapon from our db
    //add the weapon id to the character
    setTimeout(() => {
      let localWeapon = localStorage.getItem('weapon')
      if (localWeapon == null) {
        console.log(`error`)
      }
      else {
        let weapon: Weapon = (JSON.parse(localWeapon)) as Weapon

        this.weaponName = weapon.description;
        this.character.weaponId = weapon.weaponId;
        console.log(this.weaponName)
      }
    }, 4000);

  }

  RetrievefromSession(): Weapon | null {
    const weapon = sessionStorage.getItem('weapon');
    if (weapon === null) {
      console.log('Error Occurred')
      return null;
    } else {
      let OWeapon: Weapon = JSON.parse(weapon);
      return OWeapon;
    }
  }
}





