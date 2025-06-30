import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Register } from 'src/app/Models/Auth';
import { PrdserviceService } from 'src/app/product/services/prdservice.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartservicesService } from 'src/app/cart/services/cartservices.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  hide = signal<boolean>(true);
  token = signal<string>('');
  loginFm!: FormGroup;
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authservice = inject(AuthService);
  private ProductServ = inject(PrdserviceService);
  private cartserv = inject(CartservicesService);
  private destroyRef = inject(DestroyRef);
  private spinnerService = inject(NgxSpinnerService);

constructor() {
    this.loginFm = this.fb.group({
      email: ['', [Validators.required,  Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

}

  ngOnInit(): void {
    // this.getUsersData();
  }

  public getUsersData(): void {
    this.spinnerService.show();
    if (this.loginFm.valid) {
      const formData = this.loginFm.value;

    this.authservice.GetAllDatauser().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({next:(ele: Register[]) => {
      const EmailExist = ele.find((x: Register) => x.email === formData.email && x.password === formData.password);
      if (EmailExist) {
          this.spinnerService.hide();
        this.token.set('shoppingToken') ;
        localStorage.setItem('token', this.token());
        this.router.navigate(['/Feature']);
        this.ProductServ.openCustomSnackbar('fa-solid fa-circle-check',"assets/correct.jpg",'successfully Sign in');

        // this.ProductServ.updateTotalItemFavorite();
        // this.ProductServ.updateTotalItemCart();
        this.cartserv.GetAllCarts().subscribe();
        this.cartserv.GetAllFavorites().subscribe();
        // this.cartserv.GetDataToCartToCheck();
        // this.cartserv.GetHeartDataToCheck();
        this.authservice.login(EmailExist);
      } else {
        this.ProductServ.openCustomSnackbar(
          'fa-solid fa-circle-xmark',
          "assets/wrong.jpg",
          'Email or bassword not corect'
        );
      }
    },
        error: (error) => {
           this.spinnerService.hide();
          console.error('Error fetching user data:', error);
          this.ProductServ.openCustomSnackbar(
            'fa-solid fa-circle-xmark',
            "assets/wrong.jpg",
            'An error occurred while fetching user data'
          );
        }});
    }
  }


}
