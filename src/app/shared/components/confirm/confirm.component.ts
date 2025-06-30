
import { Component, DestroyRef, inject, OnInit, signal, computed } from '@angular/core';
import { CartservicesService } from 'src/app/cart/services/cartservices.service';
import { PrdserviceService } from 'src/app/product/services/prdservice.service';
import {  CartItems } from 'src/app/Models/cart-product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Order } from 'src/app/Models/Orders';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  getallconfirm = signal<CartItems[]>([]);
  cardInfomation = signal<any>(null);
  Totalprice = computed(() => this.calculateTotal());
  Totalquantity = computed(() => this.calculateQuantity());
  orderitem = computed(()=>this.cardInfomation()?.length)

  private conprd = inject(CartservicesService);
  private cartservice = inject(PrdserviceService);
  private Destroyref = inject(DestroyRef);

  ngOnInit(): void {
    this.getAllconfirmcart();
  }

  calculateQuantity(): number {
    return this.getallconfirm().reduce((total, product) => total + product.quantity, 0);
  }


  calculateTotal(): number {
    return this.getallconfirm().reduce((total, product) => total + product.quantity * product.newPrice, 0);
  }

  getAllconfirmcart(): void {
    this.conprd.GetAllOrder().pipe(takeUntilDestroyed(this.Destroyref)).subscribe({
      next: (orders: Order[]) => {
        const user = this.cartservice.getUserFromLocalStorage();
        if (!user) {
          console.error('User not found in local storage.');
          return;
        }

        const userOrders = orders.filter((order) => order.userId === user.id);
        if (userOrders.length > 0) {
          const latestOrder = userOrders[userOrders.length - 1];
          this.getallconfirm.set(latestOrder.products);
          this.cardInfomation.set(latestOrder.cardInfo);
        }
      },
      error: (error) => {
        console.error('Error fetching confirmed orders:', error);
        this.conprd.openCustomSnackbar(
          'fa-solid fa-circle-xmark',
          'assets/wrong.jpg',
          'Failed to fetch confirmed orders. Please try again.'
        );
      }
    });
  }
}
