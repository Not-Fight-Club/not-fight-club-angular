import { Time } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Fight } from '../interfaces/fight';
import { FightService } from '../service/fight/fight.service';
import { Location } from '../interfaces/location';
import { Weather } from '../interfaces/weather';

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


  
  constructor(private fightService: FightService) { }

  ngOnInit(): void {
    this.fightService.getWeather().subscribe(w => this.weathers = w);
    this.fightService.getLocations().subscribe(l => this.locations = l);
  }
  showAddFight: boolean = false;
  ngOnChanges(): void {
    if (this.fight) {
      this.fight = this.fight;
    }


  }

  savePrivate(fight: Fight): void {
    this.fightService.newPrivateFight(fight).subscribe(fights => { });

  }
  savePublic(fight: Fight): void {
    this.fightService.newPublicFight(fight).subscribe(fights => { });

  }
  onSubmit(fightForm: NgForm) {

    console.log(fightForm);
    let fight: Fight = {
      fightId: 0,
      CreatorId: fightForm.value.creator,
      StartDate:fightForm.value.startdate,
      EndDate: fightForm.value.enddate,
      Location: fightForm.value.location,
      Weather: fightForm.value.weather
    };

    if (fightForm.value.public) {
      this.savePublic(fight);
    }
    else {
      this.savePrivate(fight);
    }
  }

  }

  


