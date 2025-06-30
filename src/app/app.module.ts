import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './product/product.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from './core/Core.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    CartModule,
    ProductModule,
    SharedModule,
    // CoreModule,
        NgxSpinnerModule.forRoot({ type: "line-scale-pulse-out" })




  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
