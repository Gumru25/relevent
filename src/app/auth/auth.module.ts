import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSignInComponent } from './pages/page-sign-in/page-sign-in.component';
import { AuthRoutingModule } from './auth-routing.module';
import { PageRegisterComponent } from './pages/page-register/page-register.component';



@NgModule({
  declarations: [
    PageSignInComponent,
    PageRegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
