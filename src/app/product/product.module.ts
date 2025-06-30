import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendingPrdComponent } from './components/trending-prd/trending-prd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { MatrialModule } from '../material/matrial.module';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductRoutingModule } from './Product-routing.module';
import { SkeletonCardComponent } from '../shared/components/skeleton-card/skeleton-card.component';
import { DetailsSkeletonComponent } from './components/product-details/details-skeleton/details-skeleton.component';

@NgModule({
  declarations: [

    TrendingPrdComponent,
    AllProductsComponent,
    AllCategoriesComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatrialModule,
    FormsModule,
    ProductRoutingModule,
    SkeletonCardComponent,
    DetailsSkeletonComponent
  ],
  exports:[TrendingPrdComponent,AllProductsComponent,AllCategoriesComponent,ProductDetailsComponent ]
})
export class ProductModule { }
