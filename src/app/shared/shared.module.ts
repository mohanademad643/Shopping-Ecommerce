


import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './components/feature/feature.component';
import { HeaderComponent } from './components/header/header.component';
import { ModernComponent } from './components/modern/modern.component';
import { SpecialOfferComponent } from './components/special-offer/special-offer.component';
import { CustomerReviewsComponent } from './components/customer-reviews/customer-reviews.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CustomSnackbarComponent } from './components/custom-snackbar/custom-snackbar.component';
import { MatrialModule } from '../material/matrial.module';
import { RoutercomponentComponent } from './components/routercomponent/routercomponent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductModule } from '../product/product.module';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { SharedRoutingModule } from './shared-routing.module';
import { VedioDailogComponent } from './components/vedio-dailog/vedio-dailog.component';
import { FernitureServiceComponent } from './components/ferniture-service/ferniture-service.component';
import { StartingLoaderComponent } from './components/starting-loader/starting-loader.component';
import { HeaderSectionComponent } from './components/header-section/header-section.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FeatureComponent,
    ModernComponent,
    HeaderSectionComponent,
    SpecialOfferComponent,
    CustomerReviewsComponent,
    FooterComponent,
    UserProfileComponent,
    CustomSnackbarComponent,
    RoutercomponentComponent,
    ConfirmComponent,
    NewsletterComponent,
    ContactComponent,
    AboutUsComponent,
    OrderConfirmationComponent,
    VedioDailogComponent,
    FernitureServiceComponent,
    StartingLoaderComponent,
    SuccessDialogComponent

  ],
  imports: [
    CommonModule,
    MatrialModule,
    FormsModule,
    ReactiveFormsModule,
    ProductModule,
    SharedRoutingModule,

  ],
  exports: [
    HeaderComponent,
    FeatureComponent,
    ModernComponent,
    SpecialOfferComponent,
    CustomerReviewsComponent,
    FooterComponent,
    UserProfileComponent,
    CustomSnackbarComponent,
    RoutercomponentComponent,
    HeaderSectionComponent,
    FormsModule,
    ReactiveFormsModule,
    ConfirmComponent,
    NewsletterComponent,
    ContactComponent,
    AboutUsComponent,
    VedioDailogComponent,
    StartingLoaderComponent,
    FernitureServiceComponent,
    SuccessDialogComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
