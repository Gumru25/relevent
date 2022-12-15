import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HeaderRoutingModule } from './header-routing.module';
import { AuthService } from 'src/app/auth/auth.service';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
		HeaderRoutingModule
  ],
	exports: [
		HeaderComponent
	]
})
export class HeaderModule { }
