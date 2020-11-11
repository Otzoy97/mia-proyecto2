import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { VerifyAccountComponent } from './components/user/verify-account/verify-account.component';
import { InfoUserComponent } from './components/user/info-user/info-user.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/user/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { CuatroCeroUnoComponent } from './components/pages/cuatro-cero-uno/cuatro-cero-uno.component';
import { CincoCeroCeroComponent } from './components/pages/cinco-cero-cero/cinco-cero-cero.component';
import { RecoverPwdComponent } from './components/user/recover-pwd/recover-pwd.component';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    VerifyAccountComponent,
    InfoUserComponent,
    HomeComponent,
    NavbarComponent,
    CuatroCeroUnoComponent,
    CincoCeroCeroComponent,
    RecoverPwdComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
