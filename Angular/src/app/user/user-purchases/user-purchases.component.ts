import { Component, Input, OnInit } from '@angular/core';
import { UserR } from '../../interfaces/userR';
import { ShopService } from '../../service/shop/shop.service';

@Component({
  selector: 'app-user-purchases',
  templateUrl: './user-purchases.component.html',
  styleUrls: ['./user-purchases.component.css']
})
export class UserPurchasesComponent implements OnInit {

  @Input() user!: UserR;

  productList: any[] = [];
  totalRecords: number = this.productList.length;
  page: number = 1;
  maxSize: number = 2;

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    //get user data from parent component 
    this.shopService.ProductList(this.user).subscribe(x => {
      this.productList = x
      console.log(x)
    })
  }

}
