import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { of } from 'rxjs';
import { Discount } from '../interfaces/discount';
import { Product } from '../interfaces/product';
import { User } from '../interfaces/user';
import { ProductService } from '../service/product/product.service';
import { UserService } from '../service/user/user.service';
import { SeasonTimerComponent } from '../season-timer/season-timer.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  locations: Product[] = [];
  weapons: Product[] = [];
  traits: Product[] = [];
  constructor(private productService: ProductService, private userService: UserService) { }

  ngOnInit(): void {
    this.productService.productList().subscribe(x => {
      console.log(x);
      //put each product into a different list based on category
      x.forEach(elem => {
        if (elem.categoryId != null) {
          if (elem.categoryId == 2) {
            //add the element to the location list
            this.locations.push(elem);
          }
          else if (elem.categoryId == 1) {
            this.traits.push(elem);
          }
          else if (elem.categoryId == 5) {
            this.weapons.push(elem);
          }
        } else {
          this.products.push(elem);
        }
       
      })
      //this.products = x;
      console.log(`this.products`)
    });
  }

  buyProductButton(productId: number) {

    // get user from session

    let userString = sessionStorage.getItem('user');
    console.log(userString);
    if (userString === null) {
      alert("You are not logged in.");
      return
    }
    let user = JSON.parse(userString);

    // let userString: string | null = localStorage.getItem('user');
    // if (userString === null) {
    //   alert("You are not logged in.");
    //   return
    // }
    // let user: User = JSON.parse(userString);
    // let user= {UserId: Guid.create(), UserName: "username", Email: "email", Dob: Date.now(), Bucks: 50, Pword: "password", Active: true, LastLogin: Date.now()}

    //dummy userid that exists on db
    //let id: Guid = Guid.parse("EA0EF870-5D07-42A7-B5E6-1F6BF8706415");

    this.productService.getProductById(productId).subscribe(data => {
      console.log(data);

      this.productService.buyProduct(user.userId, data).subscribe(obj => {
        //call userService to update the bucks
        console.log(obj);
        var finalPrice = Discount(data.productDiscount, data.productPrice);

        if (userString !== null) {
          user.bucks = user.bucks - finalPrice;
        }
        window.alert(`You just bought ${data.productName} at discounted price ${finalPrice}. Total bucks remaining: ${user.bucks}`);
        this.userService.editProfile(obj.userId, user).subscribe(obj => {
          sessionStorage.setItem('user', JSON.stringify(obj));
        });
      });
    })


    // let user= {userId: Guid.create(), userName: "username", email: "email", dob: "2000-01-01", bucks: 50, pword: "password" }

    // this.productService.buyProduct(productId, user).subscribe();

  }

}
