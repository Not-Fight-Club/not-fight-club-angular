import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { of } from 'rxjs';
import { Product } from '../interfaces/product';
import { User } from '../interfaces/user';
import { ProductService } from '../service/product/product.service';
import { UserService } from '../service/user/user.service';
import { SeasonTimerComponent } from '../season-timer/season-timer.component';
import { Season } from '../interfaces/season';
import { SeasonService } from '../service/season/season.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  endTime: Date = new Date();

  constructor(private productService: ProductService, private userService: UserService, private seasonService: SeasonService) { }

  ngOnInit(): void {
    this.productService.productList().subscribe(x => {
      console.log(x);
      this.products = x;
    });

    this.seasonService.getCurrentSeason().subscribe(x => {
      console.log(x);
      this.endTime = x.seasonalEndDate;
    })
  }

  buyProductButton(productId: number) {

    // get user from session
    // let userString: string | null = localStorage.getItem('user');
    // if (userString === null) {
    //   alert("You are not logged in.");
    //   return
    // }
    // let user: User = JSON.parse(userString);
    // let user= {UserId: Guid.create(), UserName: "username", Email: "email", Dob: Date.now(), Bucks: 50, Pword: "password", Active: true, LastLogin: Date.now()}

    //dummy userid that exists on db
    let id: Guid = Guid.parse("EA0EF870-5D07-42A7-B5E6-1F6BF8706415");
    this.productService.getProductById(productId).subscribe(data => {
      console.log(data);

      this.productService.buyProduct(id, data).subscribe(obj => {
        //call userService to update the bucks
        console.log(obj);
        //Edit user bucks accordingly and send post request to edit the bucks.
        // console.log(data);
        // if (data.productDiscount) {
        //   let finalPrice = data.productPrice - ((data.productDiscount / 100) * data.productPrice);
        // }
        // if (userString !== null) {
        //   user.bucks = user.bucks - Math.Round(finalPrice);
        // }
        // this.userService.editProfile(obj.userId, user).subscribe();
      });
    })

    // let user= {userId: Guid.create(), userName: "username", email: "email", dob: "2000-01-01", bucks: 50, pword: "password" }

    // this.productService.buyProduct(productId, user).subscribe();
  }

}
