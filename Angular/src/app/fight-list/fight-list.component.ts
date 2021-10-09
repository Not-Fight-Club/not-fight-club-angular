import { Component, Input, OnInit } from '@angular/core';
import { Fight } from '../interfaces/fight';
import { FightService } from '../service/fight/fight.service';

@Component({
  selector: 'app-fight-list',
  templateUrl: './fight-list.component.html',
  styleUrls: ['./fight-list.component.css']
})
export class FightListComponent implements OnInit {
  @Input() fights:Fight[]=[];
  totalRecords: number = this.fights.length;
  page: number = 1;
  maxSize: number = 2;
  constructor(private fightService: FightService) { }

  ngOnInit(): void {
    //this.getFightsByUserId('CA8E183D-0549-401E-8789-10D1921BB1C9');
  }
 

}
