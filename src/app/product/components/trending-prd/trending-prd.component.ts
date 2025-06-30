import { Component, DestroyRef, inject, OnInit, signal, computed } from '@angular/core';
import { PrdserviceService } from '../../services/prdservice.service';
import { Product } from 'src/app/Models/product';
import { CartservicesService } from 'src/app/cart/services/cartservices.service';
import { CartItems } from 'src/app/Models/cart-product';
import { FavoriteItems } from 'src/app/Models/Favorite-Product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-trending-prd',
  templateUrl: './trending-prd.component.html',
  styleUrls: ['./trending-prd.component.scss']
})
export class TrendingPrdComponent implements OnInit {
  vListAllPrd = signal<Product[]>([]);
  endResponse = signal(false);
  allCarts = computed(() => this.Cartserv.allCarts());
  AllFavorite = computed(() => this.Cartserv.AllFavorite());
  private spinnerService = inject(NgxSpinnerService);
  private prdtService = inject(PrdserviceService);
  private Cartserv = inject(CartservicesService);
  private Destroyref = inject(DestroyRef);

  ngOnInit(): void {

    this.GetAlltrendingPrd();
  }

  filterTrendPrd(role: string): void {
    this.spinnerService.show(),
    this.prdtService.filterTrendPrd(role).subscribe({
      next: (data: Product[]) =>{
        this.spinnerService.hide();
        this.vListAllPrd.set(data);
      } ,
      error: (error) => {
        this.spinnerService.hide(),
        console.error('Error filtering products:', error);
        this.Cartserv.openCustomSnackbar(
          'fa-solid fa-circle-xmark',
          'assets/wrong.jpg',
          'Failed to filter products. Please try again.'
        );
      }
    });
  }


  GetAlltrendingPrd(): void {
    this.prdtService.getAllTrendPrd().pipe(takeUntilDestroyed(this.Destroyref)).subscribe({
      next: (data: Product[]) => {
        this.endResponse.set(true);
        this.vListAllPrd.set(data.slice(8, 16));
      },
      error: (error) => {

        console.error('Error fetching trending products:', error);
        this.Cartserv.openCustomSnackbar(
          'fa-solid fa-circle-xmark',
          'assets/wrong.jpg',
          'Failed to fetch trending products. Please try again.'
        );
      }
    });
  }


  addToCart(product: Product): void {
    this.spinnerService.show(),
      this.prdtService.addToCart(product).subscribe({
        next: () => this.spinnerService.hide(),
        error: (error) => {
          this.spinnerService.hide(),
          console.error('Error adding item to cart:', error);
          this.Cartserv.openCustomSnackbar(
            'fa-solid fa-circle-xmark',
            'assets/wrong.jpg',
            'Failed to add product to cart. Please try again.'
          );
        }
      });
  }


  checkIfProductInCart(productId: string): boolean {
    return this.allCarts().some((cart: CartItems) => cart.id === productId);
  }

  checkIfProductInFavorite(productId: string): boolean {
    return this.AllFavorite().some((cart: FavoriteItems) => cart.id === productId);
  }


 postproductTofavorite(product: Product): void {
    this.spinnerService.show(),
      this.prdtService.postFavoritePrd(product).subscribe({
        next: () => this.spinnerService.hide(),
        error: (error) => {
          this.spinnerService.hide(),
          console.error('Error adding item to favorite:', error);
          this.Cartserv.openCustomSnackbar(
            'fa-solid fa-circle-xmark',
            'assets/wrong.jpg',
            'Failed to add product to favorites. Please try again.'
          );
        }
      });
  }
}
