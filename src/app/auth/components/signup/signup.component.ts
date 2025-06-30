import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  computed,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PrdserviceService } from 'src/app/product/services/prdservice.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Register } from 'src/app/Models/Auth';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartservicesService } from 'src/app/cart/services/cartservices.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide = signal<boolean>(true);
  hide_2 = signal<boolean>(true);
  token = signal<string | null>(null);
  id = signal<number>(Date.now());
  registerForm: FormGroup;

  private router = inject(Router);
  private authservice = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private spinnerService = inject(NgxSpinnerService);
  private cartserv = inject(CartservicesService);

  isFormValid = computed(() => this.registerForm.valid);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        Fname: ['', [Validators.required]],
        Lname: ['', [Validators.required]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^01[0-2]\d{8}$/)],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        Gender: ['', [Validators.required]],
        repassword: ['', [Validators.required]],
      },
      { validators: this.matchPasswords }
    );
  }

  ngOnInit(): void {
    // this.getAllDataFromUser();
  }

  matchPasswords(control: AbstractControl) {
    const password = control.get('password');
    const rePassword = control.get('repassword');
    if (password?.value === rePassword?.value) {
      return null;
    } else {
      rePassword?.setErrors({ matchPasswords: 'Passwords do not match.' });
      return { matchPasswords: 'Passwords do not match.' };
    }
  }

  RegisterAfterCheck() {
    this.spinnerService.show();
    if (this.isFormValid()) {
      const formData: Register = {
        id: this.id().toString(),
        Fname: this.registerForm.value.Fname!,
        Lname: this.registerForm.value.Lname!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
        repassword: this.registerForm.value.repassword!,
        phoneNumber: this.registerForm.value.phoneNumber!,
        Gender: this.registerForm.value.Gender!,
      };

      this.authservice
        .GetAllDatauser()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (ele: Register[]) => {
            const EmailExist = ele.some(
              (x: Register) => x.email === formData.email
            );

            if (EmailExist) {
              this.cartserv.openCustomSnackbar(
                'fa-solid fa-circle-xmark',
                'assets/wrong.jpg',
                'Email Already Exists'
              );
            } else {
              this.spinnerService.hide();
              this.token.set('shoppingToken');
              localStorage.setItem('token', this.token()!);
              this.authservice.login(formData);
              this.router.navigate(['/Feature']);
              this.authservice.PostSingUpInfo(formData).subscribe({
                next: () => {
                  this.router.navigate(['/Feature']);
                  console.log('Register Successfully');
                },
                error: (error) => {
                  console.error('Error posting user:', error);
                  this.cartserv.openCustomSnackbar(
                    'fa-solid fa-circle-xmark',
                    'assets/wrong.jpg',
                    'An error occurred while registering the user'
                  );
                },
              });
              this.cartserv.openCustomSnackbar(
                'fa-solid fa-circle-check',
                'assets/correct.jpg',
                'Successfully Signed Up'
              );
             this.cartserv.GetAllCarts().subscribe();
        this.cartserv.GetAllFavorites().subscribe();
            }
          },
          error: (error) => {
            this.spinnerService.hide();
            console.error('Error fetching user data:', error);
            this.cartserv.openCustomSnackbar(
              'fa-solid fa-circle-xmark',
              'assets/wrong.jpg',
              'An error occurred while fetching user data'
            );
          },
        });
    }
  }


}
