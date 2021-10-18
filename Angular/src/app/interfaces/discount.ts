export function Discount(discount: number, price: number){
  let finalPrice = price - ((discount / 100) * price);
  return Math.round(finalPrice);
}