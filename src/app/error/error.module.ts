import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageErrorComponent } from './pages/page-error/page-error.component';
import { ErrorRoutingModule } from './error-routing.module';



@NgModule({
  declarations: [
    PageErrorComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
