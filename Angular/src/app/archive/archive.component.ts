import { Component, OnInit } from '@angular/core';
import { ArchiveService } from '../service/archive/archive.service';
import { FightService } from '../service/fight/fight.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  fightList: any[] = [];
  userFightList: any[] =[];
  totalRecords: number = this.fightList.length;
  page: number = 1;
  maxSize: number = 2;
  userId?:string|null;
  constructor(private archiveService: ArchiveService, private fightService:FightService) {

  }
  ngOnInit(): void {
    this.getFights();
      //this.getFightsByUserId('CA8E183D-0549-401E-8789-10D1921BB1C9');
    this.loadUserId();
//     if(this.userId){
//       this.getFightsByUserId(this.userId);
// }
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

  


}
