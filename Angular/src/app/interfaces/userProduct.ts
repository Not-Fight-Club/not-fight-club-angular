import { Guid } from "guid-typescript";

export interface UserProduct
{
  userProductId: number;
  userId: Guid;
  productId: number;
}