import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { User } from '../interfaces/user';
import { UserR } from '../interfaces/userR';
import { SignInData } from '../model/signInData';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }


  areCredentialsInvalid = false;
  authenticated: Boolean = false;

  ngOnInit(): void {
  }



 async onSubmit(signInForm: NgForm) {

    //if (!signInForm.valid) {
    //  this.isFormInValid = true;
    //  this.areCredentialsInvalid = false;
    //  return;
    //}

    //grab a single user from the database
    //check the password entered on the form with the returned password from the database using bcrypt
    //if the password matches, change isauthenticated to true and redirect to home
    //save user to session storage
    //if the password doesn't match display to screen that credentials are invalid



    const signInData: SignInData = new SignInData(signInForm.value.email, signInForm.value.password);
    //this.authenticationService.authenticate(signInData);

    //make a call to the authentication service to get a user from the database

    this.authenticated = await this.authenticationService.Login(signInData); //pass data to authentication service
    
      if (this.authenticated) {
        //redirect user to home page
        this.areCredentialsInvalid = false;
        this.router.navigate([''])
        console.log('I made it to rerouter')

      } else if(!this.authenticated) { //added this as an else if to see if it would get rid of the invalid credentials message
        console.log("I'm in the case when result is false and I'm not authenticated")
        sessionStorage.clear();
        //user is getting the message that their credentials are invalid before we finish attempting to authenticate
        //not sure what is causing this error
        this.areCredentialsInvalid = true;
        sessionStorage.clear();
      }
    
     
    //console.log(`login component: ${OUser}`);
    //save that user to session storage

  }


  authenticate(): boolean {
    let authenticated = this.authenticationService.isAuthenticated;
    console.log(`final auth: ${authenticated}`);
    return authenticated;
  }


  //this method is strictly for development purposes and should be deleted for the final project.
  BypassLogin(): void {
    // let id: Guid = Guid.parse("C39158F1-A0F0-426C-A9EB-B13253F602DF");
    let user: User = {
      userId: Guid.parse("C39158F1-A0F0-426C-A9EB-B13253F602DF"),
      userName: 'Winnie Wynn',
      pword: 'password',
      email: 'email@email.com',
      dob: new Date(),
      bucks: 20,
      active: true,
      lastLogin: new Date(),
      loginStreak: 3,
      profilePic: '',
      rewardCollected: true
    }


    sessionStorage.setItem('user', JSON.stringify(user));
  }

}
