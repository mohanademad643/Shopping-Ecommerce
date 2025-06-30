import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCartsComponent } from './components/all-carts/all-carts.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { RoutercomponentComponent } from '../shared/components/routercomponent/routercomponent.component';
import { authGuardGuard } from '../auth/guard/auth-guard.guard';


const routes: Routes = [

  { path: '', component: RoutercomponentComponent,canActivate:[authGuardGuard],children:[

  // { path: 'cart',   loadComponent: () => import('./components/all-carts/all-carts.component').then(m => m.AllCartsComponent) },
  { path: 'cart', component: AllCartsComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: 'checkout', component: CheckoutComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
