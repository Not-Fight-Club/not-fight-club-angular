import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { of } from 'rxjs';
import { Discount } from '../interfaces/discount';
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
    let userString = sessionStorage.getItem('user');
    console.log(userString);
    if (userString === null) {
      alert("You are not logged in.");
      return
    }
    let user = JSON.parse(userString);
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
  }

}
