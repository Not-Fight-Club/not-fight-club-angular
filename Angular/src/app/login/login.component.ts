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

  ngOnInit(): void {
  }

  //this method can be removed since it is not used for validation anymore. But wait until final days in case it becomes
  //useful for something else
  //can use it for hashing passwords

  onSubmit(signInForm: NgForm) {

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

    let authenticated = this.authenticationService.Login(signInData); //pass data to authentication service
    authenticated.then(result => {
      if (result) {
        //redirect user to home page
        this.areCredentialsInvalid = false;
        this.router.navigate([''])
        console.log('I made it to rerouter')

      } else {

        sessionStorage.clear();
        this.areCredentialsInvalid = true;
        sessionStorage.clear();
      }
    }
      , error => console.log(error))
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
    let user: User = {
      userId: 'C39158F1-A0F0-426C-A9EB-B13253F602DF',
      userName: 'Winnie Wynn',
      pword: 'password',
      email: 'email@email.com',
      dob: new Date(),
      bucks: 20
    }

    sessionStorage.setItem('user', JSON.stringify(user));
  }

}
