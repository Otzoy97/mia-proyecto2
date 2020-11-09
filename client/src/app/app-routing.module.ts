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
    redirectTo: '/singin',
    pathMatch: 'full'
  },
  {
    path: 'singin',
    component: SignInComponent
  },
  {
    path: 'singup',
    component: SignUpComponent
  },
  {
    path: 'user/info',
    component: InfoUserComponent
  },
  {
    path: 'user/auth',
    component: VerifyAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
