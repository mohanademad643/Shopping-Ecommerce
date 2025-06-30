import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './components/email/email.component';
import { SecurityCodeComponent } from './components/security-code/security-code.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthComponent } from './auth.component';


const routes: Routes = [
  { path: 'enter', component: AuthComponent, children: [
    { path: '', component: SigninComponent },
    { path: 'signtin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'email', component: EmailComponent },
    { path: 'code', component: SecurityCodeComponent },
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
