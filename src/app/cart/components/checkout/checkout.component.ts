import { Component, DestroyRef, inject, OnInit, signal, computed } from '@angular/core';
import { CartservicesService } from '../../services/cartservices.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  condition = signal(false);
  waysdeliverd = signal(false);
    CartData= computed(()=>this.cartservice.allCarts());
  endResponse = signal<boolean >(false);
  private spinnerService = inject(NgxSpinnerService);

  Totalprice = computed(() => this.calculateTotalPrice());
  visaForm!: FormGroup;
  deliveryForm!: FormGroup;

  private fb = inject(FormBuilder);
  private cartservice = inject(CartservicesService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);


  constructor() {

    this.deliveryForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5,6}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^01[0-2]\d{8}$/)]],
    });

    this.visaForm = this.fb.group({
      Name: ['', Validators.required],
      number: ['', [Validators.required, Validators.pattern(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|2(?:22[1-9]|2[3-9][0-9]|[3-6][0-9]{2}|7(?:[01][0-9]|20))[0-9]{12})$/)]],
      date: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
    });
  }
  ngOnInit(): void {

    this.getAllCarts();
  }


  getAllCarts(): void {
    this.cartservice.GetAllCarts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
       next: () => {
        this.endResponse.set(true);
      },
      error: (error) => {
        console.error('Error fetching cart data:', error);
        this.cartservice.openCustomSnackbar(
          'fa-solid fa-circle-xmark',
          'assets/wrong.jpg',
          'Failed to fetch cart data. Please try again.'
        );
      }
    });
  }

  calculateTotalPrice(): number {
    return this.CartData().reduce((total, product) => total + product.quantity * product.newPrice, 0);
  }

  DeleviryCheckout(): void {
    this.spinnerService.show();
    if (this.deliveryForm.valid) {
      const cardInfo = this.deliveryForm.value;
      const orderData: any = {
        userId: this.cartservice.getUserFromLocalStorage().id,
        products: this.CartData(),
        totalPrice: this.Totalprice(),
        date: new Date().toISOString().split('T')[0],
        cardInfo: {
          typeCardCheckout: 'Deleviry',
          fullName: cardInfo.fullName,
          address: cardInfo.address,
          city: cardInfo.city,
          postalCode: cardInfo.postalCode,
          phoneNumber: cardInfo.phoneNumber
        }
      };

      this.cartservice.postOrder(orderData).subscribe({
        next: () => {
           this.spinnerService.hide();
          this.router.navigate(['/confirm']);
        },
        error: (error) => {
           this.spinnerService.hide();
          console.error('Error placing order:', error);
          this.cartservice.openCustomSnackbar(
            'fa-solid fa-circle-xmark',
            'assets/wrong.jpg',
            'Failed to place order. Please try again.'
          );
        }
      });
    } else {
      this.cartservice.openCustomSnackbar(
        'fa-solid fa-circle-exclamation',
        'assets/wrong.jpg',
        'Please fill out all required fields correctly.'
      );
    }
  }

  // Handle Visa checkout
  VisaCheckoutOrder(): void {
           this.spinnerService.show();

    if (this.visaForm.valid) {
      const cardInfo = this.visaForm.value;
      const orderData: any = {
        userId: this.cartservice.getUserFromLocalStorage().id,
        totalPrice: this.Totalprice(),
        date: new Date().toISOString().split('T')[0],
        products: this.CartData(),
        cardInfo: {
          typeCardCheckout: 'Card',
          Name: cardInfo.Name,
          number: cardInfo.number,
          expiryDate: cardInfo.date,
          cvv: cardInfo.cvv
        }
      };

      this.cartservice.postOrder(orderData).subscribe({
        next: () => {
           this.spinnerService.hide();

          this.router.navigate(['/confirm']);
        },
        error: (error) => {
           this.spinnerService.hide();

          console.error('Error placing order:', error);
          this.cartservice.openCustomSnackbar(
            'fa-solid fa-circle-xmark',
            'assets/wrong.jpg',
            'Failed to place order. Please try again.'
          );
        }
      });
    } else {
      this.cartservice.openCustomSnackbar(
        'fa-solid fa-circle-exclamation',
        'assets/wrong.jpg',
        'Please fill out all required fields correctly.'
      );
    }
  }

  VisaSection(): void {
    this.condition.set(!this.condition());
  }
}

