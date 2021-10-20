import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms'
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Observable, Subscriber } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/service/user/user.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User | null = null;
  formValue !: FormGroup;
  // image?: string;

 
  constructor(private router: Router, private formbuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      userId: [''],
      userName: [''],
      email: [''],
      dob: [''],
      bucks: [''],
      pword: [''],
      active: [''],
      lastLogin: [''],
      loginStreak: [''],
      profilePic: [''],
      rewardCollected: [' ']
    })
      

    let userFromSession = sessionStorage.getItem('user');
    let id = sessionStorage.getItem('user');
      if (!userFromSession) {
        return
      } else {
        let currentUser = JSON.parse(userFromSession);
      // let id = JSON.parse(userFromSession).userId;
      // let username = JSON.parse(userFromSession).userName;
      // let email = JSON.parse(userFromSession).email;
      // let dob = JSON.parse(userFromSession).dob;
      // let bucks = JSON.parse(userFromSession).bucks;
      // let password = JSON.parse(userFromSession).pword;

      this.formValue.controls['userId'].setValue(currentUser.userId);
      this.formValue.controls['userName'].setValue(currentUser.userName);
      this.formValue.controls['email'].setValue(currentUser.email);
      this.formValue.controls['dob'].setValue(currentUser.dob);
      this.formValue.controls['pword'].setValue(currentUser.pword);
      this.formValue.controls['bucks'].setValue(currentUser.bucks);
      this.formValue.controls['active'].setValue(currentUser.active);
      this.formValue.controls['lastLogin'].setValue(currentUser.lastLogin);
      this.formValue.controls['loginStreak'].setValue(currentUser.loginStreak);
      this.formValue.controls['profilePic'].setValue(currentUser.profilePic);
      this.formValue.controls['rewardCollected'].setValue(currentUser.rewardCollected);
      // debugger
      }
   
  }

  onChange($event: Event) {
    if ($event !== null) {
      const file = ($event.target as HTMLInputElement).files![0];
      console.log(file);
      this.convertToBase64(file);
    }
  }

  
  updateCurrentUser() {
    console.log(this.formValue.value);
    //let id: Guid = Guid.parse("EA0EF870-5D07-42A7-B5E6-1F6BF8706415");
    //this.formValue.value.userId = "EA0EF870-5D07-42A7-B5E6-1F6BF8706415";
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser === null) {
      console.log('Error Occurred')
    } else {
      let capturedUser: User = JSON.parse(sessionUser);
      if (capturedUser.userId != null) {
        // this.userService.editProfile(this.formValue.value.userId, this.formValue.value).subscribe(data => {
        this.userService.editProfile(capturedUser.userId, this.formValue.value).subscribe(data => {//nothing is every done with the response???
          // this.userService.getUserById(this.formValue.value.userId);
          console.log(data.pword);
          console.log(data.profilePic);
       
          sessionStorage.setItem('user', JSON.stringify(data));
          this.router.navigateByUrl(`/users/${this.formValue.value.userId}`)
      })
    
      }
    }
   
  };

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((d) => {
      console.log(d);
      this.formValue.value.profilePic = d;
      // this.image = d;
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    };
    fileReader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    }
  }
  
  
  goBackToProfile() {
    this.router.navigateByUrl(`/users/${this.formValue.value.userId}`)
  }

  deleteUser() {
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
      if (confirm("Are you sure you want to delete your profile?\nAll information associated to this user profile will be permanently deleted.")) {
        //
        // let DBUserId: Guid = Guid.parse("53266E78-7DEE-42C9-B9B8-E40422C959BF");
        this.userService.deleteUser(id1).subscribe(
          id => {
            this.router.navigate(['**']); //send them back to the home page after deleting their account
          });
      }
    }
  }

}
