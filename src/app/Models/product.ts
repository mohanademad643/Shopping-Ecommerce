export  interface Product {
  id: string;
  oldPrice: number;
  newPrice: number;
  description: string;
  title: string;
  image: string;
  roles: string;
  Addedtocart?: boolean;
  quantityAvailable:number;
}
