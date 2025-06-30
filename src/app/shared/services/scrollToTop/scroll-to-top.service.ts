import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, delay } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollToTopService {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  setupScrollToTop() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      delay(100) 
    ).subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.smoothScrollToTop();
      }
    });
  }

  private smoothScrollToTop() {
    const scrollToTop = (duration: number) => {
      const startingY = window.pageYOffset;
      const startTime = performance.now();

      const step = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        window.scrollTo(0, startingY * (1 - this.easeInOutCubic(progress)));

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };

    scrollToTop(300); 
  }

  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
}