import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEventsComponent } from './pages/page-events/page-events.component';
import { EventsRoutingModule } from './events-routing.module';
import { HeaderModule } from '../shared/components/header/header.module';
import { FooterModule } from '../shared/components/footer/footer.module';
import { MatButtonModule } from '@angular/material/button';
import { PageEventComponent } from './pages/page-event/page-event.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    PageEventsComponent,
    PageEventComponent
  ],
  imports: [
    CommonModule,
		EventsRoutingModule,
		HeaderModule,
		FooterModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatDatepickerModule,
		MatNativeDateModule
  ],
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
	]
})
export class EventsModule { }
