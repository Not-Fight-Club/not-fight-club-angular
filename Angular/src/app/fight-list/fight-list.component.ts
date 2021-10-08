import { Component, OnInit } from '@angular/core';
import { Fight } from '../interfaces/fight';
import { FightService } from '../service/fight/fight.service';

@Component({
  selector: 'app-fight-list',
  templateUrl: './fight-list.component.html',
  styleUrls: ['./fight-list.component.css']
})
export class FightListComponent implements OnInit {
  fights:Fight[]=[];
  constructor(private fightService: FightService) { }

  ngOnInit(): void {
    this.getFightsByUserId('CA8E183D-0549-401E-8789-10D1921BB1C9');
  }
  getFightsByUserId(id: string){
    //let classThis: FightListComponent = this;
    return this.fightService.getFightsByUserId(id).subscribe(fights =>{
      console.log(fights);
      this.fights = fights;
    });
  }

}
