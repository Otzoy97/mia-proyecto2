import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import {SignInComponent} from './components/user/sign-in/sign-in.component'
import {SignUpComponent} from './components/user/sign-up/sign-up.component'
import {InfoUserComponent} from './components/user/info-user/info-user.component'
import {VerifyAccountComponent} from './components/user/verify-account/verify-account.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'user/info',
    component: InfoUserComponent
  },
  {
    path: 'api/user/update/account-status/:id',
    component: VerifyAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
