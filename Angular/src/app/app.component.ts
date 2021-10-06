import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './service/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '!FightClub';

  constructor(public authenticationService: AuthenticationService, private router: Router, private activatedRoute: ActivatedRoute) {

  }
  
  hideCarasol = true;

  logout() {
    this.authenticationService.logout();
  }

  navigateToProfile() {
    let id = sessionStorage.getItem('user');
    console.log(id);
    // const id1 = JSON.parse(id).userId;
    // console.log(id1);
    // debugger
    if (!id) {
      return
    } else {
      let id1 = JSON.parse(id).userId
      console.log(id1)
      this.router.navigateByUrl(`/users/${id1}`)
    }
  }

  //tried to use just a variable for this part, but it would not register the change in authentication status
  authenticate():boolean {
    let authenticated = this.authenticationService.isAuthenticated;
    //console.log(`final auth: ${authenticated}`);
    return authenticated;
  }

  HideCarasol(): boolean {
    return this.hideCarasol = true;
  }
   

}
