import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-favorite-skeleton',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './favorite-skeleton.component.html',
  styleUrl: './favorite-skeleton.component.scss'
})
export class FavoriteSkeletonComponent {

}
