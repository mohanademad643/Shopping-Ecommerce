import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-details-skeleton',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './details-skeleton.component.html',
  styleUrl: './details-skeleton.component.scss'
})
export class DetailsSkeletonComponent {

}
