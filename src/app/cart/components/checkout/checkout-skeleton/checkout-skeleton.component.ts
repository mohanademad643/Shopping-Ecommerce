import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-checkout-skeleton',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './checkout-skeleton.component.html',
  styleUrl: './checkout-skeleton.component.scss'
})
export class CheckoutSkeletonComponent {

}
