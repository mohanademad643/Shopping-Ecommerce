// shared-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './components/feature/feature.component';
import { ModernComponent } from './components/modern/modern.component';
import { SpecialOfferComponent } from './components/special-offer/special-offer.component';
import { CustomerReviewsComponent } from './components/customer-reviews/customer-reviews.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { RoutercomponentComponent } from './components/routercomponent/routercomponent.component';
import { authGuardGuard } from '../auth/guard/auth-guard.guard';
import { FernitureServiceComponent } from './components/ferniture-service/ferniture-service.component';

const routes: Routes = [

  { path: '', component: RoutercomponentComponent,canActivate:[authGuardGuard],children:[
    { path: '', component: FeatureComponent },
    { path: 'Feature', component: FeatureComponent },
    { path: 'service', component: FernitureServiceComponent },
    { path: 'modern', component: ModernComponent },
    { path: 'special', component: SpecialOfferComponent },
    { path: 'reviews', component: CustomerReviewsComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'confirm', component: ConfirmComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutUsComponent },
    { path: 'OrderConfirmed', component: OrderConfirmationComponent },
    { path: 'newsletter', component: NewsletterComponent },
  ] },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
