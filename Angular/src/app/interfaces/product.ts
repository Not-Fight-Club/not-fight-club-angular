import { DecimalPipe } from "@angular/common";

export interface Product {
  productId: number,
  seasonalId: number,
  productName: string,
  productPrice: number,
  productDescription: string,
  productDiscount: number
}