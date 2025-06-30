import { Component, inject, OnInit, signal } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { ScrollToTopService } from './shared/services/scrollToTop/scroll-to-top.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit {
   title = 'shoping';
  // private ScrollTo = inject(ScrollToTopService);
  showLoader = signal<boolean>(true);
  constructor(private wowservice: NgwWowService) {
    this.wowservice.init();

  }
  ngOnInit(): void {
    // this.ScrollTo.setupScrollToTop();
    setTimeout(() => {
      this.showLoader.set(false);
    }, 3000);
  }


  public getUserFromLocalStorage(): any {
    const user = localStorage.getItem('UserToken');
    return user ? JSON.parse(user) : null;
  }

}
