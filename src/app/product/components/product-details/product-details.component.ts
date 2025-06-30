import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrdserviceService } from '../../services/prdservice.service';
import { Product } from 'src/app/Models/product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId = signal<any>([]);
  productDetails = signal<Product>({} as Product);
  Endresponse = signal(false);
  selectedImage = signal<string>('');
  private spinnerService = inject(NgxSpinnerService);

  private route = inject(ActivatedRoute);
  private prdservice = inject(PrdserviceService);
  private Destroyref = inject(DestroyRef);

  ngOnInit(): void {
    this.productId.set(this.route.snapshot.paramMap.get('id'));
    this.loadProductDetails();
  }

  changeImage(newImage: string): void {
    this.selectedImage.set(newImage);
  }

  loadProductDetails(): void {
    const id = this.productId();
    if (!id) return;

    this.prdservice.getProductUsingId(id).pipe(takeUntilDestroyed(this.Destroyref)).subscribe({
      next: (data: Product) => {
        this.Endresponse.set(true);
        this.productDetails.set(data);
        this.selectedImage.set(data.image);
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
        this.prdservice.openCustomSnackbar(
          'fa-solid fa-circle-xmark',
          'assets/wrong.jpg',
          'Failed to fetch product details. Please try again.'
        );
      }
    });
  }


   addToCart(product: Product): void {
    this.spinnerService.show(),
      this.prdservice.addToCart(product).subscribe({
        next: () => this.spinnerService.hide(),
        error: (error) => {
          this.spinnerService.hide(),
          console.error('Error adding item to cart:', error);
          this.prdservice.openCustomSnackbar(
            'fa-solid fa-circle-xmark',
            'assets/wrong.jpg',
            'Failed to add product to cart. Please try again.'
          );
        }
      });
  }

postproductTofavorite(product: Product): void {
    this.spinnerService.show(),
      this.prdservice.postFavoritePrd(product).subscribe({
        next: () => this.spinnerService.hide(),
        error: (error) => {
          this.spinnerService.hide(),
          console.error('Error adding item to favorite:', error);
          this.prdservice.openCustomSnackbar(
            'fa-solid fa-circle-xmark',
            'assets/wrong.jpg',
            'Failed to add product to favorites. Please try again.'
          );
        }
      });
  }
}

