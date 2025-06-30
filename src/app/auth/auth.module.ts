import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmailComponent } from './components/email/email.component';
import { SecurityCodeComponent } from './components/security-code/security-code.component';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatrialModule } from '../material/matrial.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    EmailComponent,
    SecurityCodeComponent,
    AuthComponent

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatrialModule,
    HttpClientModule,
     MatFormFieldModule,
     MatInputModule,
     NgIf
  ],
  exports:[
    SigninComponent,
    SignupComponent,
    EmailComponent,
    SecurityCodeComponent,
    AuthComponent]
})
export class AuthModule { }
