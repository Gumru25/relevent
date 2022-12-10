import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HeaderRoutingModule } from './header-routing.module';



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
