import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageMainComponent } from './pages/page-main/page-main.component';
import { MainRoutingModule } from './main-routing.module';
import { HeaderModule } from '../shared/components/header/header.module';
import { FooterModule } from '../shared/components/footer/footer.module';



@NgModule({
  declarations: [
    PageMainComponent
  ],
  imports: [
    CommonModule,
		MainRoutingModule,
		HeaderModule,
		FooterModule
  ]
})
export class MainModule { }
