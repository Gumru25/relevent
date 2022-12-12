import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageSignInComponent } from './pages/page-sign-in/page-sign-in.component';
import { AuthRoutingModule } from './auth-routing.module';
import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { HeaderModule } from '../shared/components/header/header.module';
import { FooterModule } from '../shared/components/footer/footer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';



@NgModule({
  declarations: [
    PageSignInComponent,
    PageRegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
		HeaderModule,
		FooterModule,
		// FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule
  ],
	providers: [
		AuthService,
		UserService
	]
})
export class AuthModule { }
