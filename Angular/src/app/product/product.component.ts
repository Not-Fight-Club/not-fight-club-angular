import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { of } from 'rxjs';
import { Product } from '../interfaces/product';
import { User } from '../interfaces/user';
import { ProductService } from '../service/product/product.service';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  constructor(private productService: ProductService, private userService: UserService) { }

  ngOnInit(): void {
    this.productService.productList().subscribe(x => {
      console.log(x);
      this.products = x;
    });
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
    let id: Guid = Guid.parse("DEEE375B-92B4-4864-92B5-1573AADB7D22");
    this.productService.getProductById(productId).subscribe(data => {
      console.log(data);
      this.productService.buyProduct(id, data).subscribe(obj => {
        //call userService to update the bucks
        console.log(obj);
        // if (userString !== null) {
        //   user.bucks = user.bucks - data.productPrice;
        // }
        // this.userService.editProfile(obj.userId, user).subscribe();
      });
    })
  
    // let user= {userId: Guid.create(), userName: "username", email: "email", dob: "2000-01-01", bucks: 50, pword: "password" }
    
    // this.productService.buyProduct(productId, user).subscribe();
  }

}
