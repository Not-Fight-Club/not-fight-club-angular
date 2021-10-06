import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { SignInData } from '../../model/signInData';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { UserR } from '../../interfaces/userR';



@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  //you would call an authentication service here in this class. I need to research which one to use and add
  //in the appropriate information

  //mockUser data to test if the functions work
  //private readonly mockedUser = new SignInData('bnwynn16@gmail.com', 'test123')
  isAuthenticated = false; //controlling which navbar items are available when not logged in
  

  constructor(private router: Router, private userService: UserService) { }


  async Login(signInData: SignInData):Promise<Boolean>{
    let password = signInData.getPassword();
    let OUser = await this.userService.Login(signInData.getEmail())
    let observer = {
      next: (user: UserR) =>{
        //put the user in session storage
        sessionStorage.setItem('user', JSON.stringify(user));
        console.log(`Should've added to session already`)
          },
      error: (err: Error) => console.log(`there was an error`)
    }
    OUser.subscribe(observer);
    
   return this.Authenticate(password);
    
  }
    async Authenticate(password: string):Promise<Boolean> {
      //get the user from session
      const OUser = this.RetrievefromSession();
   
      console.log(`in authenticate`)
      if (OUser === null) {
        console.log('Error Occurred')
       // return null;
      } else {
        await bcrypt.compare(password, OUser.pword)
          .then(result => {
            if (!result) {
              console.log(`result: ${result}`)

              sessionStorage.clear();

            }
            this.isAuthenticated = result
          }
            
           
          
            , error => console.log(error));
        
      }
      return this.isAuthenticated;
      
      //compare password there with the password passed in
      
      
        // if they match return true
        //if they don't match return false
          //remove user from session
      
  }


  RetrievefromSession(): User|null {
    const user = sessionStorage.getItem('user');
    if (user === null) {
      console.log('Error Occurred')
      return null;
    } else {
      let OUser: User = JSON.parse(user);
      return OUser;
    }
  }
  

  
  //authenticate(signInData: SignInData): boolean {
  //  if (this.checkCredentials(signInData)) {
  //    this.isAuthenticated = true;
  //    this.router.navigate([''])
  //    console.log(this.isAuthenticated);
  //    console.log('userAuthenticated');
  //    return true;
  //  }
  //  this.isAuthenticated = false;
  //  return false;
  //}


  //private checkCredentials(signInData: SignInData): boolean {
  //  //should call to a webservice that authenticates the user info
  //  return this.checkEmail(signInData.getEmail()) && this.checkPassword(signInData.getPassword());
  //}

  ////these methods would not be needed if third-party authentication is used
  //private checkEmail(email: string){
    
  //  //if there return true
  //  //if null give message 'no user registered with email entered'
  //  let loggedUser = this.userService.Login(email); //grab user from the data base with this email
  //  const userSubscription = loggedUser.subscribe({
  //    next(user) {
  //      console.log("email authenticated");
  //      console.log(`logged in user pword: ${user.pword}`);
  //      return true;
  //    },
  //    error(msg) {
  //      console.log('Error: ', msg);
  //    },
  //  });

  //  //if (email === this.mockedUser.getEmail()) {
  //  //  console.log('email authenticated');
      
  //  //  //stop listening for user after 10 seconds
  //  //  //setTimeout(() => {
  //  //  //  userSubscription.unsubscribe();
  //  //  //}, 10000)
  //  //  return true;
  //  //}
  //  //console.log('email not authenticated');
  //  //return false;
  //}

  //private checkPassword(password: string): boolean {
  //  //only check password if email is found
  //  //retrieve the password for the provided email
  //  //if entered password === password from db return true
  //  //if (password === this.mockedUser.getPassword()) {
  //  //  console.log('password authenticated');
  //  //  return true;
  //  //}
  //  //console.log('password not authenticated');
  //  //return false;
  //  return true;
  //}

  logout() {
    //you would also clear out the session storage here if we decide to store things
    this.isAuthenticated = false;
    //return them to the home page
    this.router.navigate(['']);
    //remove all data from session storage
    sessionStorage.clear();
    console.log('User signed out')
  }
  

}


