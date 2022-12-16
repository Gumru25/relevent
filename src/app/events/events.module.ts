import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEventsComponent } from './pages/page-events/page-events.component';
import { EventsRoutingModule } from './events-routing.module';
import { HeaderModule } from '../shared/components/header/header.module';
import { FooterModule } from '../shared/components/footer/footer.module';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    PageEventsComponent
  ],
  imports: [
    CommonModule,
		EventsRoutingModule,
		HeaderModule,
		FooterModule,
		MatButtonModule
  ]
})
export class EventsModule { }
