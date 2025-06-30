
import { Component, DestroyRef, inject, OnInit, signal, computed, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CartservicesService } from '../../services/cartservices.service';
import { Product } from 'src/app/Models/product';
import { CartItems } from 'src/app/Models/cart-product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-all-carts',
  templateUrl: './all-carts.component.html',
  styleUrls: ['./all-carts.component.scss']
})
export class AllCartsComponent implements OnInit {

  private cartservice = inject(CartservicesService);
  private Destroyref = inject(DestroyRef);
  private spinnerService = inject(NgxSpinnerService);

  cartdata = computed(()=>this.cartservice.allCarts() ) ;
  Totalprice = computed(() => this.calculateTotal());
  getlenght = computed(() => this.cartdata()?.length);
  endResponse = signal<boolean >(false);

  displayedColumns: string[] = ['image', 'title', 'price', 'quantity', 'option'];
  dataSource = new MatTableDataSource<CartItems>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAllCarts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getAllCarts(): void {
    this.cartservice.GetAllCarts().pipe(takeUntilDestroyed(this.Destroyref)).subscribe({
      next: () => {
        this.endResponse.set(true);
        this.dataSource.data = this.cartdata();
      },
      error: (error) => {

        console.error('Error fetching cart data:', error);
        this.cartservice.openCustomSnackbar(
          'fa-solid fa-circle-xmark',
          'assets/wrong.jpg',
          'Failed to fetch cart data. Please try again.'
        );
      }
    });
  }

  calculateTotal(): number {
    return this.cartdata().reduce((total, product) => total + product.quantity * product.newPrice, 0);
  }

  private updateQuantityInAPIProducts(product: CartItems, isIncreasing: boolean): void {
    if (isIncreasing && product.quantityAvailable <= 0) {
      this.cartservice.openCustomSnackbar(
        'fa-solid fa-circle-exclamation',
        product.image,
        'No more stock available.'
      );
      return;
    }

    const updatedProduct: Product = {
      id: product.id,
      oldPrice: product.oldPrice,
      newPrice: product.newPrice,
      description: product.description,
      title: product.title,
      image: product.image,
      roles: product.roles,
      quantityAvailable: product.quantityAvailable - product.quantity,
      // quantityAvailable: product.quantityAvailable,
    };

    this.cartservice.updateProduct(updatedProduct).subscribe({
      next: () => console.log('Product updated successfully'),
      error: (error) => {
        console.error('Error updating product in API:', error);
        this.cartservice.openCustomSnackbar(
          'fa-solid fa-circle-xmark',
          product.image,
          'Failed to update product stock.'
        );
      }
    });
  }

  updateQuantityInAPICartProducts(product: CartItems): void {
    this.cartservice.updateCartItem(product).subscribe({
      next: () => console.log('Cart item updated successfully'),
      error: (error) => {
        console.error('Error updating cart item:', error);
        this.cartservice.openCustomSnackbar(
          'fa-solid fa-circle-xmark',
          product.image,
          'Failed to update cart item.'
        );
      }
    });
  }

  DeleteItem(product: CartItems): void {
    this.spinnerService.show();
    this.cartservice.RmoveCArtItem(product.DeleteCartId, 'cartProduct').subscribe({
      next: () => {
        const updatedProduct: any = {
          id: product.id,
          oldPrice: product.oldPrice,
          newPrice: product.newPrice,
          description: product.description,
          title: product.title,
          image: product.image,
          roles: product.roles,
          quantityAvailable: product.quantityAvailable + 1
        };


    this.cartservice.updateProduct(updatedProduct).subscribe({
      next: () =>{
           this.spinnerService.hide();
        console.log(' Product deleted successfully.');
      },
      error: (error) => {
          this.spinnerService.hide();
        console.error('Error updating product in API:', error);
        this.cartservice.openCustomSnackbar(
          'fa-solid fa-circle-xmark',
          product.image,
          'Failed to update product stock.'
        );
      }
    });
    this.getAllCarts();
      },
      error: (error) => {
        console.error('Error deleting cart item:', error);
        this.cartservice.openCustomSnackbar(
          'fa-solid fa-circle-xmark',
          product.image,
          'Failed to delete product. Please try again.'
        );
      }
    });
  }


  increaseValue(product: CartItems): void {
    if (product.quantityAvailable > 0) {
      product.quantity++;
      this.updateQuantityInAPIProducts(product, true);
      this.updateQuantityInAPICartProducts(product);
    } else {
      this.cartservice.openCustomSnackbar(
        'fa-solid fa-circle-exclamation',
        product.image,
        'Cannot increase quantity. No more stock available.'
      );
    }
  }

  decreaseValue(product: CartItems): void {
    if (product.quantity > 1) {
      product.quantity--;
      this.updateQuantityInAPIProducts(product, false);
      this.updateQuantityInAPICartProducts(product);
    } else {
      this.cartservice.openCustomSnackbar(
        'fa-solid fa-circle-exclamation',
        product.image,
        'Quantity cannot be less than 1.'
      );
    }
  }
}
