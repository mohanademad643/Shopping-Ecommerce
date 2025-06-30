import { Component, DestroyRef, inject, OnInit, signal, computed } from '@angular/core';
import { PrdserviceService } from '../../services/prdservice.service';
import { Product } from 'src/app/Models/product';
import { CartservicesService } from 'src/app/cart/services/cartservices.service';
import { CartItems } from 'src/app/Models/cart-product';
import { FavoriteItems } from 'src/app/Models/Favorite-Product';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {

  minValue = 0;
  maxValue = 10000;
  OpenFilterBox = signal(false);
  sectionStates = signal<boolean[]>([]);
  vListAllPrd = signal<Product[]>([]);
  endResponse = signal(false);
    private spinnerService = inject(NgxSpinnerService);
  allCarts = computed(()=>this.Cartserv.allCarts());
  AllFavorite = computed(()=>this.Cartserv.AllFavorite());
  counter = computed(() => this.vListAllPrd().length);


  private prdservice = inject(PrdserviceService);
  private Cartserv = inject(CartservicesService);
  private Destroyref = inject(DestroyRef);


  filterSections: any[] = [
    {
      title: 'Categories',
      options: [
        { id: 1, name: 'Armrest', value: 'Armrest' },
        { id: 2, name: 'Backrest', value: 'Backrest' },
        { id: 3, name: 'Base', value: 'Base' },
        { id: 4, name: 'Batting', value: 'Batting' },
        { id: 5, name: 'Brackets', value: 'Brackets' },
        { id: 6, name: 'Chair', value: 'Chair' },
        { id: 7, name: 'Clips', value: 'Clips' },
        { id: 8, name: 'Cushion', value: 'Cushion' }
      ]
    },
    {
      title: 'Rooms',
      options: [
        { id: 9, name: 'Bedroom', value: 'Bedroom' },
        { id: 10, name: 'Living Room', value: 'Living Room' },
        { id: 11, name: 'Kitchen', value: 'Kitchen' },
        { id: 12, name: 'Bathroom', value: 'Bathroom' },
        { id: 13, name: 'Dining Room', value: 'Dining Room' },
        { id: 14, name: 'Study Room', value: 'Study Room' }
      ]
    },
    {
      title: 'Brands',
      options: [
        { id: 15, name: 'Ikea', value: 'Ikea' },
        { id: 16, name: 'Ashley Furniture', value: 'Ashley Furniture' },
        { id: 17, name: 'Rooms To Go', value: 'Rooms To Go' },
        { id: 18, name: 'Herman Miller', value: 'Herman Miller' },
        { id: 19, name: 'Ethan Allen', value: 'Ethan Allen' },
        { id: 20, name: 'West Elm', value: 'West Elm' },
        { id: 21, name: 'Wayfair', value: 'Wayfair' },
        { id: 22, name: 'Crate & Barrel', value: 'Crate & Barrel' },
        { id: 23, name: 'Pottery Barn', value: 'Pottery Barn' }
      ]
    },
    {
      title: 'Rating',
      options: [
        { id: 24, stars: 5, label: '(05)' },
        { id: 25, stars: 4, label: '(04)' },
        { id: 26, stars: 3, label: '(03)' },
        { id: 27, stars: 2, label: '(02)' },
        { id: 28, stars: 1, label: '(01)' }
      ]
    },
    {
      title: 'Price',
      priceRange: { min: 0, max: 10000, step: 1, value: 0 }
    },
    {
      title: 'Materials',
      options: [
        { id: 29, name: 'Wood', value: 'Wood' },
        { id: 30, name: 'Metal', value: 'Metal' },
        { id: 31, name: 'Upholstery', value: 'Upholstery' },
        { id: 32, name: 'Wicker', value: 'Wicker' },
        { id: 33, name: 'Glass', value: 'Glass' },
        { id: 34, name: 'Rattan', value: 'Rattan' },
        { id: 35, name: 'Stone', value: 'Stone' },
        { id: 36, name: 'Concrete', value: 'Concrete' },
        { id: 37, name: 'Bamboo', value: 'Bamboo' }
      ]
    }
  ];

  ngOnInit(): void {
    this.sectionStates.set(this.filterSections.map(() => false));
    this.GetAllproductCategories();
  }


  toggleSection(index: number): void {
    const updatedStates = [...this.sectionStates()];
    updatedStates[index] = !updatedStates[index];
    this.sectionStates.set(updatedStates);
  }

  onMinChange(event: Event): void {
    const newMin = +(event.target as HTMLInputElement).value;
    if (newMin >= 0 && newMin <= this.maxValue) {
      this.minValue= newMin;
    }
  }


  onMaxChange(event: Event): void {
    const newMax = +(event.target as HTMLInputElement).value;
    if (newMax >= this.minValue && newMax <= 10000) {
      this.maxValue = newMax;
    }
  }


  addToCart(product: Product): void {
    this.prdservice.addToCart(product).subscribe({
      next: () => this.spinnerService.hide(),
      error: (error) =>{
        this.spinnerService.hide(),
        console.error('Error adding item to cart:', error)}
    });
  }


  postproductTofavorite(product: Product): void {
    this.spinnerService.show(),
    this.prdservice.postFavoritePrd(product).subscribe({
      next: () => this.spinnerService.hide(),
      error: (error) =>{
        this.spinnerService.hide(),
        console.error('Error adding item to favorite:', error)}
    });
  }

  private GetAllproductCategories(): void {
    this.prdservice.getAllTrendPrd().pipe(takeUntilDestroyed(this.Destroyref)).subscribe({
      next: (data: Product[]) =>{
         this.vListAllPrd.set(data);
         this.endResponse.set(true);
      },
      error: (error) => console.error('Error fetching products:', error)
    });
  }

  checkIfProductInCart(productId: string): boolean {
    return this.allCarts().some((cart: CartItems) => cart.id === productId);
  }

  checkIfProductInFavorite(productId: string): boolean {
    return this.AllFavorite().some((cart: FavoriteItems) => cart.id === productId);
  }
  calculateProgress(value: number): number {
    const priceSection = this.filterSections.find(section => section.title === 'Price');
    const rangeMin = priceSection.priceRange.min;
    const rangeMax = priceSection.priceRange.max;

    return ((value - rangeMin) / (rangeMax - rangeMin)) * 100;
  }

}
