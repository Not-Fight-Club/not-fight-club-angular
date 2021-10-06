import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/service/user/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User | null = null;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) { }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.userService.getUserById(params["userId"]).subscribe(user => {
        console.log(user);
        this.user = user;
      })
    })
  }
}
