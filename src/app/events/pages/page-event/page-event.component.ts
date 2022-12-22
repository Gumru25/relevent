import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../events.service';
import {
	Observable,
} from 'rxjs';
import { EventConcert } from '../../event.model';

@Component({
  selector: 'app-page-event',
  templateUrl: './page-event.component.html',
  styleUrls: ['./page-event.component.scss']
})
export class PageEventComponent  {

	private id: string = this.activatedRoute.snapshot.params['id'];
	public eventConcert$: Observable<EventConcert | null> = this.eventsService.getEventConcertById(this.id);

	constructor(
		private activatedRoute: ActivatedRoute,
		private eventsService: EventsService
	) {}


}