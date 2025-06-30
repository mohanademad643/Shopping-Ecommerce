import { Component } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [NgxSkeletonLoaderModule],
  templateUrl: './skeleton-card.component.html',
  styleUrl: './skeleton-card.component.scss'
})
export class SkeletonCardComponent {

}
