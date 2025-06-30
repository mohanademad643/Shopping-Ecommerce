import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-skeleton',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './cart-skeleton.component.html',
  styleUrl: './cart-skeleton.component.scss'
})
export class CartSkeletonComponent {

}
