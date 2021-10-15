import { Component, Input, OnInit } from '@angular/core';

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
  @Input() endTime:Date = new Date();
  constructor() { }

  ngOnInit(): void {

  }

  timer: any = setInterval(() => {
    let currentTime = new Date().getTime();
    let targetTime = new Date(this.endTime).getTime();
    let timeDifference = targetTime - currentTime;

    this.days = Math.floor(timeDifference / 86400000);
    this.hours = Math.floor((timeDifference % 86400000) / 3600000);
    this.minutes = Math.floor((timeDifference % 3600000) / 60000);
    this.seconds = Math.floor((timeDifference % 60000) / 1000);

    if (timeDifference <= 0) {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      clearInterval(this.timer);
    }

  }, 800)
}
