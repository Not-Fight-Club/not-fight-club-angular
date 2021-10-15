import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { userInfo } from 'os';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/service/user/user.service';
import { UserR } from '../../interfaces/userR';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User | null = null;
  // user: UserR | null = null;
  image: any;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) { }
  about: boolean = true;
  previousPurchases: boolean = false;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
     console.log(params);
      this.userService.getUserById(params["userId"]).subscribe(user => {
       console.log(user);
        this.user = user;
        this.image = user.profilePic;
    })

      // get the user from session storage instead
      // let id = sessionStorage.getItem('user');
      // if (!id) {
      //   return
      // } else {
      //   let id1 = JSON.parse(id);
      //   this.user = id1;
      //   console.log(this.user);
      //   console.log(this.user?.userId)
      // }
      
   })
  }

  Toggle(elem: HTMLAnchorElement) {
    if (elem.id == "purchases-tab") {
      //if the link pressed is the purchases link then turn off the data showing for the about link and turn on the data for the purchases
      //turn of the active class for the about link and turn on active for purchases
      document.getElementById("home-tab")?.classList.remove("active");
      elem.classList.add("active");
      this.about = false;
      this.previousPurchases = true;
    }
    else if (elem.id == "home-tab") {
      document.getElementById("purchases-tab")?.classList.remove("active");
      elem.classList.add("active");
      this.previousPurchases = false;
      this.about = true;
    }
    console.log(this.about)
  }
}
