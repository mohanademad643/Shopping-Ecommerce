import { HttpClient } from '@angular/common/http';
import { computed, DestroyRef, effect, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, of, tap } from 'rxjs';
import { CartItems, CartProduct } from 'src/app/Models/cart-product';
import { FavoriteItems, FavoriteProduct } from 'src/app/Models/Favorite-Product';
import { Order } from 'src/app/Models/Orders';
import { Product } from 'src/app/Models/product';
import { CustomSnackbarComponent } from 'src/app/shared/components/custom-snackbar/custom-snackbar.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartservicesService {
  // horizontalpozition1: MatSnackBarHorizontalPosition = 'center';
  // horizontalpozition2: MatSnackBarVerticalPosition = 'top';
  allCarts$ = signal<CartItems[]>([]);

  AllFavorite$ = signal<FavoriteItems[]>([]);
  public allCarts = computed(() => this.allCarts$());
  public AllFavorite = computed(() => this.AllFavorite$());

  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);
  private Destroyref = inject(DestroyRef);

  GetAllFavorites() {
    const user = this.getUserFromLocalStorage();
    if (!user) {
      return new Observable<any>(subscriber => subscriber.error('User not authenticated'));
    }
    return this.http.get<FavoriteProduct[]>(`${environment.apiBaseUrl}/FavoriteProduct`).pipe(
      tap((data: FavoriteProduct[]) => {
        const userProduct = data.filter((cartItem: FavoriteProduct) => cartItem.userId === user.id);
        const FavoriteItems = userProduct.map((ele: FavoriteProduct) => ele.items);
        this.AllFavorite$.set(FavoriteItems);
      })
    );
  }
  logout(){
    this.allCarts$.set([]);
    this.AllFavorite$.set([]);
  }

  GetAllCarts() {
    const user = this.getUserFromLocalStorage();
    if (!user) {
      return new Observable<any>(subscriber => subscriber.error('User not authenticated'));
    }
    return this.http.get<CartProduct[]>(`${environment.apiBaseUrl}/cartProduct`).pipe(
      tap((data: CartProduct[]) => {
        const userProduct = data.filter((cartItem: CartProduct) => cartItem.userId === user.id);
        const CartItems = userProduct.map((ele: CartProduct) => ele.items);
        this.allCarts$.set(CartItems);

      })
    );
  }

  updateCartItem(product: CartItems): Observable<CartProduct> {
    const body = JSON.stringify({
      id: product.DeleteCartId,
      items:
      {
        id: product.id,

        oldPrice: product.oldPrice,
        newPrice: product.newPrice,
        description: product.description,
        title: product.title,
        image: product.image,
        roles: product.roles,
        quantityAvailable: product.quantityAvailable,
        quantity: product.quantity,
        DeleteCartId: product.DeleteCartId
      }

    });

    return this.http.patch<CartProduct>(`${environment.apiBaseUrl}/cartProduct/${product.DeleteCartId}`, body, {
      headers: { 'Content-Type': 'application/json' },
    }).pipe(
      tap(() => {
        this.GetAllCarts().pipe(takeUntilDestroyed(this.Destroyref)).subscribe();
      })
    );;
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${environment.apiBaseUrl}/products/${product.id}`, product);
  }

  public RmoveCArtItem(itemId: string, serverstorage: string) {
    const user = this.getUserFromLocalStorage();
    if (!user) {
      return of();
    }
    return this.http.delete(`${environment.apiBaseUrl}/${serverstorage}/${itemId}`).pipe(
      tap(() => {
        this.GetAllFavorites().pipe(takeUntilDestroyed(this.Destroyref)).subscribe();
        this.GetAllCarts().pipe(takeUntilDestroyed(this.Destroyref)).subscribe();
      })
    );
  }

  public getUserFromLocalStorage(): any {
    const user = localStorage.getItem('UserToken');
    return user ? JSON.parse(user) : null;
  }


  postOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.apiBaseUrl}/Orders`, order);
  }


  GetAllOrder(): Observable<Order[]> {
    const user = this.getUserFromLocalStorage();
    if (!user) {
      return of([]);
    }
    return this.http.get<Order[]>(`${environment.apiBaseUrl}/Orders?userId=${user.id}`);

  }

  openCustomSnackbar(icon: string, image: string, message: string): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 1000,
      horizontalPosition: "center",
      verticalPosition: "top",
      data: {
        image: image,
        icon: icon,
        message: message,
        onActionClick: () => {
          this.snackBar.dismiss();
        },
      },
    });
  }
}
