import { Component, OnInit } from '@angular/core';
import { relativeTimeThreshold } from 'moment';
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

  //toggle fight archive on 
  fightsActive: Boolean = true;

  //toggle character archive on
  charactersActive: Boolean = false;

  fightList: Fight[] = [];


  userFightList: any[] =[];
  //get character and fighters match their id and stuff to return the fightwithcharacters list
  //pass the list to fihgt list compnent, and display info using the combined list
  charactersList:Character[]=[];
  //store fighters for one fight
  characterIdList:number[]=[];
  //store all fithers for all the past fight
  allFighters:any[] =[];
  displayUserFight:boolean = false;
  //combined list for fight with characters
  //I use an array of obj
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
    

    
  }
    //get all fighters filter our who particiapate in a fight 

    getFightWithCharacters():void{
 
      
   
      this.fightList.forEach(f=>{
        let fight:any = f;
        //get fighters by fight id,gets back a list
        this.fightService.getFighters(f.fightId).subscribe(x=>{

          let fighters:any[] = [];
          //for each fighter, 
            x.forEach(ft => {

              let fighter:any = ft; //use this to store a single fighter
              //grab the character from charactersList if the charcterId match the characterId of the fighter
              fighter.character = this.charactersList.filter(co => co.characterId === ft.characterId)[0];
              //store the figher to the fighter list
              fighters.push(fighter);
              //check if fighter is the winner, if so, grab the name and store it to winnerNavigation 
              //so that we can use later 
              if(ft.isWinner){
                fight.winnerNavigation = fighter.character.name;
              }else{
                fight.loserNavigation = fighter.character.name;
              }
              //need to convert toUpperCase because the userId I store in sessionStorage is uppercase
              //but when the userId is retrived from db, it is in lower case
              if(fighter.character.userId.toUpperCase() === this.userId?.toUpperCase())
                this.userFightList.push(fight);
               
          })
          //assign fighters[] to fighter{} obj in an []
          fight.fighters = fighters;
        });
        this.fightWithCharacters.push(fight);
          
      });
      console.log(this.userFightList);

    }
    //get characters for past fights using characterId 
    //make combination list
  
  // getFightsByUserId(id: string):void{
  
  //   this.fightService.getFightsByUserId(id).subscribe(fights =>{
  //     console.log(fights);
  //     this.userFightList = fights;
  //   });
  // }


  loadUserId(){
    let userStr = sessionStorage.getItem('user');
    if (!userStr) {
      return;
    }
    let user = JSON.parse(userStr);
    this.userId = user.userId;
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
    this.displayUserFight=!this.displayUserFight;
  }

  toggleArchiveView(elem: HTMLAnchorElement): void {
    if (elem.id == "fights") {
      //if the link pressed is the purchases link then turn off the data showing for the about link and turn on the data for the purchases
      //turn of the active class for the about link and turn on active for purchases
      document.getElementById("characters")?.classList.remove("active");
      elem.classList.add("active");
      this.charactersActive = false;
      this.fightsActive = true;
    }
    else if (elem.id == "characters") {
      document.getElementById("fights")?.classList.remove("active");
      elem.classList.add("active");
      this.fightsActive = false;
      this.charactersActive= true;
    }
  }



}
