import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageMainComponent } from './pages/page-main/page-main.component';
import { MainRoutingModule } from './main-routing.module';



@NgModule({
  declarations: [
    PageMainComponent
  ],
  imports: [
    CommonModule,
		MainRoutingModule
  ]
})
export class MainModule { }
