import { Component, OnInit } from '@angular/core';
import { Character } from '../interfaces/character';
import { Fight } from '../interfaces/fight';
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

  fightList: Fight[] = [];

  userFightList: any[] =[];
  //get character and fighters match their id and stuff to return the fightwithcharacters list
  //pass the list to fihgt list compnent, and display info using the combined list
  charactersList:Character[]=[];
  //store fighters for one fight
  characterIdList:number[]=[];
  //store all fithers for all the past fight
  allFighters:any[] =[];
  //combined list for fight with characters
  //should I use an obj
  fightWithCharacters:any[] =[];
  /*
  [{
    fightId:1,
    fighters:{
      [
        fighter:{
          character:{
            characterId:1,
            Name:"",
            Baseform:"",
            ...
          }
          fighterId:1
        },
        fighter:{
          character:{    characterId:1,
            Name:"",
            Baseform:"",
            ...}
          fighterId:2
        }
      ]
    },
    location:"",
    weather:"",
    Winner:"",
    Loser:""
  },
  ...
]
  */

  userId?:string|null;

  constructor(private archiveService: ArchiveService, private fightService:FightService,private characterService:CharacterService) {

  }
  ngOnInit(): void {
    this.loadUserId();
    this.getFights();
      //this.getFightsByUserId('CA8E183D-0549-401E-8789-10D1921BB1C9');
    
//     if(this.userId){
//       this.getFightsByUserId(this.userId);
// }
   // this.getCharacters();
    
  }
    //get all fighters filter our who particiapate in a fight 

    getFightWithCharacters():void{
    //  if(this.fightList.length>0)
  //    for(let i =0;i<this.fightList.length;i++){
  //      let f=this.fightList[i];
  //      this.fightService.getFighters(f.fightId).subscribe(x=>{
  //         this.characterIdList=x.map(ele=>ele.characterId);
  //         //characterId for each fight
  //       this.allFighters.push(this.characterIdList);

  // })
  //    }
   
      this.fightList.forEach(f=>{
        let fight:any = f;
        this.fightService.getFighters(f.fightId).subscribe(x=>{

          let fighters:any[] = [];
            x.forEach(ft => {

              let fighter:any = ft;
              fighter.character = this.charactersList.filter(co => co.characterId === ft.characterId)[0];
              fighters.push(fighter);
              if(ft.isWinner){
                fight.winnerNavigation = fighter.character.name;
              }else{
                fight.loserNavigation = fighter.character.name;
              }
              if(fighter.character.userId.toUpperCase() === this.userId?.toUpperCase())
                this.userFightList.push(fight);
               
          })
          fight.fighters = fighters;
        });
        this.fightWithCharacters.push(fight);
          
      });
      console.log(this.userFightList);

    }
    //get characters for past fights using characterId 
    //make combination list
  






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
   // this.getCharacters();
    this.archiveService.FightList().subscribe(x => {
      this.fightList = x;
      //make sure we get characters before we use the charactersList
        this.characterService.GetCharacters().subscribe(x=>{
          this.charactersList=x;
          this.getFightWithCharacters();
        })
      
    })
  }
  showMyFights():void{
    //if(this.userId)
    //  this.getFightsByUserId(this.userId);
  }
  //get all characters s.t. we can use it to find out fighters who participate in a fight
  // getCharacters():void{
  //   this.characterService.GetCharacters().subscribe(x=>{
  //     this.charactersList=x;
  //   })
  // }




}
