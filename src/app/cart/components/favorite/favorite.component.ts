import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CartservicesService } from '../../services/cartservices.service';
import { FavoriteItems } from 'src/app/Models/Favorite-Product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
endResponse = signal<boolean >(false);
  getlenght = computed(() => this.FavoriteData().length)
  FavoriteData= computed(()=>this.cartServices.AllFavorite());
  private cartServices = inject(CartservicesService);
  private Destroyref = inject(DestroyRef);
  private spinnerService = inject(NgxSpinnerService);
  ngOnInit(): void {
    this.loadFavoriteProducts();
  }
  loadFavoriteProducts(): void {
    this.cartServices.GetAllFavorites().pipe(takeUntilDestroyed(this.Destroyref)).subscribe({
      next: () =>   this.endResponse.set(true),
      error:  (error) => {
              console.error('Error fetching favorite products:', error);
              this.cartServices.openCustomSnackbar(
                'fa-solid fa-circle-xmark',
                'assets/wrong.jpg',
                'Failed to fetch favorite products. Please try again.'
              );
            }
    });
  }

  DeleteItem(product: FavoriteItems): void {
    this.spinnerService.show();
    this.cartServices.RmoveCArtItem(product.DeleteFvoriteId, 'FavoriteProduct').subscribe({
      next: () => {
        this.spinnerService.hide();

        this.cartServices.openCustomSnackbar(  'fa-solid fa-circle-check',product.image,'Product deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting favorite product:', error);
        this.cartServices.openCustomSnackbar(
          'fa-solid fa-circle-xmark',
          product.image,
          'Failed to delete product. Please try again.'
        );
      }
    });
  }


}
