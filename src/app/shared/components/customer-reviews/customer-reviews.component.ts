import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-customer-reviews',
  templateUrl: './customer-reviews.component.html',
  styleUrls: ['./customer-reviews.component.scss'],
})
export class CustomerReviewsComponent implements OnInit {
  slidesPerView = signal<number>(3) ;

   testimonials = [
    { image: 'assets/c-1.jpg',id:1, title: 'Alicon Johnson', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusamus ratione nesciunt atque.' },
    { image: 'assets/c-2.jpg',id:2, title: 'Bob Smith', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusamus ratione nesciunt atque.' },
    { image: 'assets/c-3.jpg',id:3, title: 'Carlos Davis', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusamus ratione nesciunt atque.' },
    { image: 'assets/c-4.jpg',id:4, title: 'Leo Jonas', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusamus ratione nesciunt atque.' },
    { image: 'assets/c-5.jpg',id:5, title: 'Kevin Richardson', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusamus ratione nesciunt atque.' },
    { image: 'assets/facebook.jpg',id:6, title: 'David Wilam', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusamus ratione nesciunt atque.' },
    { image: 'assets/google.jpg',id:7, title: 'Gim Morle', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusamus ratione nesciunt atque.' },
  ];

  ngOnInit(): void {
    this.updateSlidesPerView();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSlidesPerView();
  }

  updateSlidesPerView() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1200) {
      this.slidesPerView.set(3) ;
    } else if (windowWidth >= 992) {
      this.slidesPerView.set(2);
    } else {
      this.slidesPerView.set(1);
    }
  }
}
