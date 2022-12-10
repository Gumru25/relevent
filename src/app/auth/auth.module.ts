import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSignInComponent } from './pages/page-sign-in/page-sign-in.component';
import { AuthRoutingModule } from './auth-routing.module';
import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { HeaderModule } from '../shared/components/header/header.module';
import { FooterModule } from '../shared/components/footer/footer.module';



@NgModule({
  declarations: [
    PageSignInComponent,
    PageRegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
		HeaderModule,
		FooterModule
  ]
})
export class AuthModule { }
