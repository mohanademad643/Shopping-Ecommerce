import { Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartservicesService } from 'src/app/cart/services/cartservices.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isMenuOpen = signal<boolean>(false);
  scrolled = signal<boolean>(false);
  CheckingToken = signal<boolean>(false);
  showIcons = signal<boolean>(true);
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.scrolled.set(window.scrollY > 15);

  }

  private Cartservice = inject(CartservicesService);
  private authService = inject(AuthService);

  cartCount = computed(() => this.Cartservice.allCarts$()?.length);
  favoriteCount = computed(() => this.Cartservice.AllFavorite$()?.length);


  ngOnInit(): void {
    this.GetAllCartPrd();
    this.CheckLogin();

  };

  toggleIcons(): void {
    this.showIcons.set(!this.showIcons());
  }
   private GetAllCartPrd(){
    this.Cartservice.GetAllCarts().subscribe();
   }
  public RemoverFromLocalstorage(): void {
    this.authService.logout();
    this.Cartservice.logout();
    // this.Prdservices.LogOut();
    localStorage.removeItem('token');
  };
  public scrollUp(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  public CheckLogin(): void {
    const ExistToken: any = localStorage.getItem('token');
    if (ExistToken == null || ExistToken == undefined) {
      this.CheckingToken.set(true);
    }
  };

  // public toggleMenu(): void {
  //   this.isMenuOpen.set(!this.isMenuOpen);
  // }
  // public closeMenu(): void {
  //   this.isMenuOpen.set(false);
  // }


}
