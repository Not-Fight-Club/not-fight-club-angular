import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../interfaces/character';
import { Fight } from '../interfaces/fight';
import { FightService } from '../service/fight/fight.service';

@Component({
  selector: 'app-fight-list',
  templateUrl: './fight-list.component.html',
  styleUrls: ['./fight-list.component.css']
})
export class FightListComponent implements OnInit {
  @Input() fightWithCharacters:any[]=[];
  //create unique id for fight-list to distinguish the different component
  //use static make sure the id stays same even use it is in different instance
  static id:number = 0;
  paginationName:string = "fight-list-pagination-" + FightListComponent.id;
  totalRecords: number = this.fightWithCharacters.length;
  page: number = 1;
  maxSize: number = 2;
  constructor() { }

  ngOnInit(): void {
    FightListComponent.id += 1;
    
    //this.getFightsByUserId('CA8E183D-0549-401E-8789-10D1921BB1C9');
  }
  // getCharactersForFight():void{

  // } 
  // getWinnerName(fighters:any[]):string{
  //   if(fighters)
  //     return fighters.filter(f=> f.isWinner === true)[0].character.name;
  //   else
  //     return "";
  // }
   

}
