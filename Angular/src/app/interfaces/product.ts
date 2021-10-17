import { DecimalPipe } from "@angular/common";

export interface Product {
  productId: number,
  seasonalId: number | null,
  productName: string,
  productPrice: number,
  productDescription: string,
  productDiscount: number
}
