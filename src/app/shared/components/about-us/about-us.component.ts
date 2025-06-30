import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {


  testimonials = [
    { quote: 'Amazing quality and exceptional service!',id:1, author: 'Jane Doe' },
    { quote: 'A truly unique selection of furniture. Highly recommend!',id:2, author: 'John Smith' },
    { quote: 'The craftsmanship is outstanding. I love my new furniture!',id:3, author: 'Emily Johnson' }
  ];
}
