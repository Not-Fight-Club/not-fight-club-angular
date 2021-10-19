import { Component, Input, OnInit } from '@angular/core';
import { FightService } from '../service/fight/fight.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  timer: any = null;

  fightOver: boolean = false;

  @Input() tallyVotesFunction: Function | null = null;

  @Input() result: string = "";

  @Input() endTime: Date = new Date();
  constructor(fightService: FightService) { }

  ngOnInit(): void {
    this.timer=setInterval(()=>this.updateTimer(),500)
  }
 ngOnDestroy():void{
   if(this.timer){
    clearInterval(this.timer);
   }
 }

  //timer: any= setInterval( 800)
updateTimer():void{
  console.log(this);
    let currentTime = new Date().getTime();
    let targetTime = new Date(this.endTime).getTime();
    let timeDifference = targetTime - currentTime;

    this.days = Math.floor(timeDifference / 86400000);
    this.hours = Math.floor((timeDifference % 86400000) / 3600000);
    this.minutes = Math.floor((timeDifference % 3600000) / 60000);
    this.seconds = Math.floor((timeDifference % 60000) / 1000);

  if (timeDifference <= 0) {
    this.fightOver = true;
    if (this.tallyVotesFunction != null) {
      this.result = this.tallyVotesFunction();
      console.log(this.tallyVotesFunction());
    }
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      clearInterval(this.timer);
      this.timer=null;
  }
  }


}
