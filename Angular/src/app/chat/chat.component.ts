import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { environment } from '../../environments/environment';


import { TimerComponent } from '../timer/timer.component';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username: string = 'username';
  message: string = '';

  messages: any[] = [];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    Pusher.logToConsole = true;

    this.username = this.getUserName();

    const pusher = new Pusher('b23323ca0f6cc9730893', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('not-fight-chat');
    channel.bind('message', (data: any) => {
      this.messages.push(data);
    });
  }

  getUserName(): string {
    let userStr = sessionStorage.getItem('user');
    let result = "username";
    if (userStr) {
      let user = JSON.parse(userStr);
      console.log("user", user);
      result = user.userName;
    }
    return result;
  }

  submit(): void {
    //this.messages.push(this.message);
    console.log(this.messages);
    let socialURL = environment.socialApiUrl;
    this.http.post(`${socialURL}/api/messages`, {
      username: this.username,
      message: this.message
    }).subscribe(() => this.message = '');
    console.log(this.username);
    console.log(this.message);
    console.log(this.messages);
  }

}
