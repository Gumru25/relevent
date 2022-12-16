import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageEventsComponent } from './pages/page-events/page-events.component';

const routes: Routes = [
	{ path: '', component: PageEventsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
