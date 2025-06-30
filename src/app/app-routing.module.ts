import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
    { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
    { path: 'producting', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
    { path: 'carting', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
