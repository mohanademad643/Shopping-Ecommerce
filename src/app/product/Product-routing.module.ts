// product-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { AllCategoriesComponent } from './components/all-categories/all-categories.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { TrendingPrdComponent } from './components/trending-prd/trending-prd.component';
import { RoutercomponentComponent } from '../shared/components/routercomponent/routercomponent.component';
import { authGuardGuard } from '../auth/guard/auth-guard.guard';
import { FeatureComponent } from '../shared/components/feature/feature.component';

const routes: Routes = [

  { path: '', component: RoutercomponentComponent,canActivate:[authGuardGuard],children:[
   { path: '', component: FeatureComponent },
  { path: 'Categories', component: AllCategoriesComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'trending', component: TrendingPrdComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
