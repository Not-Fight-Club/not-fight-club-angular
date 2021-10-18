import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Season } from '../interfaces/season';
import { SeasonService } from '../service/season/season.service';

@Component({
  selector: 'app-season-timer',
  templateUrl: './season-timer.component.html',
  styleUrls: ['./season-timer.component.css']
})
export class SeasonTimerComponent implements OnInit {
  season: string = "";
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  timer: any = null;
  endTime: Date = new Date();
  constructor(private seasonService: SeasonService) { }

  ngOnInit(): void {
    this.seasonService.getCurrentSeason().subscribe(x => {
      this.season = x.seasonalName;
      this.endTime = x.seasonalEndDate;
    }
    );
    this.timer = setInterval(() => this.updateTimer(), 500);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  updateTimer(): void {
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
  }
}