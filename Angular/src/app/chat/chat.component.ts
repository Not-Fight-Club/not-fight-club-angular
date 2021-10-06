import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';


import { TimerComponent } from '../timer/timer.component';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username: string = 'username';
  message: string = '';

  messages:any[] = [];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('b23323ca0f6cc9730893', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('not-fight-chat');
    channel.bind('message', (data: any) => {
      this.messages.push(data);
    });
  }

  submit(): void {
    //this.messages.push(this.message);
    console.log(this.messages);
    this.http.post('http://localhost:5000/api/messages', {
      username: this.username,
      message: this.message
    }).subscribe(() => this.message = '');
    console.log(this.username);
    console.log(this.message);
    console.log(this.messages);
  }

}
