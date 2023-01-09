import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ErrorModule } from './error/error.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ErrorModule,
    BrowserAnimationsModule,
		MatDatepickerModule,
		MatNativeDateModule
  ],
  providers: [
		MatDatepickerModule,
		MatNativeDateModule
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
