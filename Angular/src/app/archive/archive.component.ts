import { Component, OnInit } from '@angular/core';
import { Character } from '../interfaces/character';
import { Fighter } from '../interfaces/fighter';
import { ArchiveService } from '../service/archive/archive.service';
import { CharacterService } from '../service/character/character.service';
import { FightService } from '../service/fight/fight.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  fightList: any[] = [];
  userFightList: any[] =[];
  //get character and fighters match their id and stuff to return the fightwithcharacters list
  //pass the list to fihgt list compnent, and display info using the combined list
  
  charactersList:Character[]=[];
  fightersList:Fighter[]=[];
  //combined list for fight with characters
  fightWithCharacters:any[]=[];
  totalRecords: number = this.fightList.length;
  page: number = 1;
  maxSize: number = 2;
  userId?:string|null;
  constructor(private archiveService: ArchiveService, private fightService:FightService,private characterService:CharacterService) {

  }
  ngOnInit(): void {
    this.getFights();
      //this.getFightsByUserId('CA8E183D-0549-401E-8789-10D1921BB1C9');
    this.loadUserId();
//     if(this.userId){
//       this.getFightsByUserId(this.userId);
// }
    this.getCharacters();
  }
  getFightsByUserId(id: string):void{
  
    this.fightService.getFightsByUserId(id).subscribe(fights =>{
      console.log(fights);
      this.userFightList = fights;
    });
  }
  loadUserId(){
    this.userId = sessionStorage.getItem('userId');
  }

  //get all past fihgts
  getFights():void{
    this.archiveService.FightList().subscribe(x => {
      this.fightList = x
    })
  }
  showMyFights():void{
    if(this.userId)
      this.getFightsByUserId(this.userId);
  }
  getCharacters():void{
    this.characterService.GetCharacters().subscribe(x=>{
      this.charactersList=x;
    })
  }

  


}
