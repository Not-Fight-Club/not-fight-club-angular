import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Fight } from '../interfaces/fight';
import { FightService } from '../service/fight/fight.service';
import { Location } from '../interfaces/location';
import { Weather } from '../interfaces/weather';
import { Character } from '../interfaces/character';
import { Router } from '@angular/router';
import { CharacterService } from '../service/character/character.service';

@Component({
  selector: 'app-priv-pub-fight',
  templateUrl: './priv-pub-fight.component.html',
  styleUrls: ['./priv-pub-fight.component.css']
})
export class PrivPubFightComponent implements OnInit {
  @Input() fight: Fight | null = null;
  @Input() loadFight: ((fightId: number, startDate: Time, endDate: Time) => void) | null = null;

  locations: Location[] = [];
  weathers: Weather[] = [];
  characters: Character[] = [];

  weather:Weather | undefined;
  character1: Character | undefined;
  character2: Character | undefined;


  
  constructor(
    private fightService: FightService,
    private characterService: CharacterService,
    private router: Router) { }

  ngOnInit(): void {
    this.fightService.getWeather().subscribe(w => this.weathers = w);
    this.fightService.getLocations().subscribe(l => this.locations = l);
    this.characterService.GetCharacters().subscribe(cs => this.characters = cs);
  }
  showAddFight: boolean = false;
  ngOnChanges(): void {
    if (this.fight) {
      this.fight = this.fight;
    }


  }

  getUserId(): string {
    let result: string = "";
    let userStr = sessionStorage.getItem("user");
    console.log(userStr);
    if (userStr) {
      let user = JSON.parse(userStr);
      console.log(user);
      let userId = user?.userId;
      if (userId) {
        result = userId;
      }
    }
    console.log(result);
    return result;
  }

  setChar1(c: Character | undefined) {
    console.log("setchar1: ", c);
    this.character1 = c;
  }

  setChar2(c: Character | undefined) {
    console.log("setchar2: ", c);
    this.character2 = c;
  }
  setWeather(w:Weather | undefined){
    this.weather = w;
  }

  redirectToFight(fight: Fight) {
    this.router.navigate(["/fight", fight.fightId]);
  }

  savePrivate(fight: any): void {
    this.fightService.newPrivateFight(fight).subscribe(newFight => {
      console.log(newFight);
      this.redirectToFight(newFight);
    });

  }
  savePublic(fight: any): void {
    this.fightService.newPublicFight(fight).subscribe(newFight => {
      console.log(newFight);
      this.redirectToFight(newFight);
    });

  }
  onSubmit(fightForm: NgForm) {

    console.log(fightForm);
    let weatherId = 0;
    if(this.weather){
      weatherId =this.weather.weatherId;
    }
    let fight: any = {
      fightId: 0,
      CreatorId: this.getUserId(),
      StartDate:fightForm.value.startdate,
      EndDate: fightForm.value.enddate,
      Location: fightForm.value.location,
      Weather: weatherId,
      Characters: [
        this.character1,
        this.character2
      ]
    };

    if (fightForm.value.public) {
      this.savePublic(fight);
    }
    else {
      this.savePrivate(fight);
    }
  }

  }

  


