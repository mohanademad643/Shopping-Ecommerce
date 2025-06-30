import { CartItems } from "./cart-product";

export interface CardInfo {
  typeCardCheckout: string;
  Name: string;
  number: number;
  expiryDate: string;
  cvv: string;
}

export interface Order {
  id: string;
  userId: string;
  products: CartItems[];
  totalPrice: number;
  cardInfo: CardInfo;
  date: string;
}
