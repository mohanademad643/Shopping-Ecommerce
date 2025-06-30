import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCartsComponent } from './components/all-carts/all-carts.component';
import { MatrialModule } from '../material/matrial.module';
import { FormsModule } from '@angular/forms';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartSkeletonComponent } from './components/all-carts/cart-skeleton/cart-skeleton.component';
import { FavoriteSkeletonComponent } from './components/favorite/favorite-skeleton/favorite-skeleton.component';
import { CheckoutSkeletonComponent } from './components/checkout/checkout-skeleton/checkout-skeleton.component';



@NgModule({
  declarations: [AllCartsComponent,FavoriteComponent,CheckoutComponent],
  imports: [
    CommonModule,
    MatrialModule,
    FormsModule,
    SharedModule,
    CartRoutingModule,
    CartSkeletonComponent,
    FavoriteSkeletonComponent,
    CheckoutSkeletonComponent
  ],
  exports:[AllCartsComponent,FavoriteComponent,CheckoutComponent]
})
export class CartModule { }
