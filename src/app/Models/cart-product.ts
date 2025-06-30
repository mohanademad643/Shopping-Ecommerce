export interface CartProduct {
  id:string;
  userId:string;
  items:CartItems;
}

export interface CartItems{
  id:string;
  oldPrice: number;
  newPrice: number;
  description: string;
  title: string;
  image: string;
  quantity: number;
  quantityAvailable:number;
  roles:string;
  DeleteCartId:string;

}
