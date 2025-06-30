export interface FavoriteProduct {
  id:string;
  userId:string;
  items:FavoriteItems;
}

export interface FavoriteItems{
  id:string;
  oldPrice: number;
  newPrice: number;
  description: string;
  title: string;
  image: string;
  quantity: number;
  quantityAvailable:number;
  roles:string;
  DeleteFvoriteId:string;

}
