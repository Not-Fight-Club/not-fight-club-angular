import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  showFirst: boolean = true;

  ngOnInit(): void {
  }

  Toggle() {
    this.showFirst = false;
  }

}
