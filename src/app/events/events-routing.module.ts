import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageEventComponent } from './pages/page-event/page-event.component';
import { PageEventsComponent } from './pages/page-events/page-events.component';

const routes: Routes = [
	{ path: '', component: PageEventsComponent },
	{ path: ':id', component: PageEventComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
