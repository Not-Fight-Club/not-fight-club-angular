import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService) { }

  
  ngOnInit(): void {
    
    this.userService.UserList().subscribe(x => {
      this.userList = x
    });
  }

  userList: User[] = [];
//create functions to interact with the API through the user service
}
