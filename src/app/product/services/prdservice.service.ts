import { inject, Injectable, DestroyRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from 'src/app/shared/components/custom-snackbar/custom-snackbar.component';
import { Product } from 'src/app/Models/product';
import { CartservicesService } from 'src/app/cart/services/cartservices.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class PrdserviceService {
  horizontalpozition1: MatSnackBarHorizontalPosition = 'center';
  horizontalpozition2: MatSnackBarVerticalPosition = 'top';
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);
  private Cartserv = inject(CartservicesService);
  private destroyRef = inject(DestroyRef);

  public getUserFromLocalStorage(): any {
    const user = localStorage.getItem('UserToken');
    return user ? JSON.parse(user) : null;
  }

  getAllTrendPrd(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiBaseUrl}/products`).pipe(tap(() => {
      this.Cartserv.GetAllCarts().subscribe();
      this.Cartserv.GetAllFavorites().subscribe();
    }));
  }


  filterTrendPrd(role: string): Observable<Product[]> {
    return this.getAllTrendPrd().pipe(
      map((products: Product[]) => products.filter((product: Product) => product.roles?.includes(role)))
    );
  }

  addToCart(item: Product): Observable<Product> {
    const user = this.getUserFromLocalStorage();
    if (!user) {
      this.openCustomSnackbar('fa-solid fa-circle-xmark', '', 'User not logged in');
      return of();
    }
    return this.checkIfItemExists(item.id, user.id, 'cartProduct').pipe(
      switchMap((itemExists: boolean) => {
        if (itemExists) {
          this.openCustomSnackbar('fa-solid fa-circle-xmark', item.image, 'Item already exists in Cart');
          return of(null);
        } else {
          item.quantityAvailable < 1 ? item.quantityAvailable = 0 : item.quantityAvailable -= 1;
          var generateUniquId = this.generateUniqueId();

          const cartItem = {
            id: generateUniquId, userId: user.id, items: { ...item, DeleteCartId: generateUniquId, quantity: 1 }
          };
          return this.http.post<any>(`${environment.apiBaseUrl}/cartProduct`, cartItem).pipe(
            tap(() => {
              this.openCustomSnackbar('fa-solid fa-circle-check', item.image, 'Added To Cart');
              this.Cartserv.GetAllCarts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
            })
          );
        }
      })
    );
  }
  private generateUniqueId(): string {

    const randomSuffix = Math.floor(Math.random() * 1000);
    return `${randomSuffix}`;
  }



  postFavoritePrd(item: Product): Observable<Product> {
    const user = this.getUserFromLocalStorage();
    if (!user) {
      return of();
    }
    return this.checkIfItemExists(item.id, user.id, 'FavoriteProduct').pipe(
      switchMap((existingItems: boolean) => {

        if (existingItems) {

          this.openCustomSnackbar('fa-solid fa-circle-xmark', item.image,
            'Item already exists in favorites');
          return of(null);
        } else {
          var generateUniquId = this.generateUniqueId()
          const favoriteItem =
          {
            id: generateUniquId,
            userId: user.id, quantity: 1,
            items: { ...item, DeleteFvoriteId: generateUniquId }
          };
          return this.http.post<any>(`${environment.apiBaseUrl}/FavoriteProduct`, favoriteItem).pipe(
            tap(() => {
              this.openCustomSnackbar('fa-solid fa-circle-check', item.image, 'Added To Favorite');
              this.Cartserv.GetAllFavorites().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();

            }), catchError(error => {
              console.error('Error adding to favorites:', error);
              this.openCustomSnackbar('fa-solid fa-circle-xmark', '', 'Failed to add item to favorites');
              return of(null);
            })
          );
        }
      })
    );
  }

  openCustomSnackbar(icon: string, image: string, message: string): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 1000,
      horizontalPosition: this.horizontalpozition1,
      verticalPosition: this.horizontalpozition2,
      data: {
        image: image,
        icon: icon,
        message: message,
        onActionClick: () => {
          this.snackBar.dismiss();
        }
      }
    });
  }


  checkIfItemExists(itemId: string, userId: string, key: string): Observable<boolean> {
    return this.http.get(`${environment.apiBaseUrl}/${key}`).pipe(
      map((data: any) => {
        const itemExists = data.some((Item: any) => Item.items.id == itemId && Item.userId == userId);
        return itemExists;

      })
    );
  }


  getProductUsingId(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiBaseUrl}/products/${id}`).pipe(tap(()=>{
      this.Cartserv.GetAllFavorites().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
      this.Cartserv.GetAllCarts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }));
  }
}
