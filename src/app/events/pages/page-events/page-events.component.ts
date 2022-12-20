import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/user/user.model';
import { EventConcert } from '../../event.model';
import { EventsService } from '../../events.service';
import { Observable, take } from "rxjs";
import { UserService } from 'src/app/user/user.service';
import { EventConcertPage } from '../../events.interfaces';

@Component({
  selector: 'app-page-events',
  templateUrl: './page-events.component.html',
  styleUrls: ['./page-events.component.scss']
})
export class PageEventsComponent {
	public eventConcerts$: Observable<EventConcertPage[]> = this.eventsService.getEventConcertsByUser(this.authService.user$);
	public user$: Observable<User | null> = this.authService.user$

	constructor(
		private eventsService: EventsService,
		private authService: AuthService,
		private userService: UserService
	) {
	}

	public addEventConcertToUser(eventConcert: EventConcertPage) {
		
		this.user$
		.pipe(
			take(1)
		)
		.subscribe(user => {
			if (user !== null) {
				const newObjEventConcert = Object.assign({}, eventConcert);
				delete (newObjEventConcert as any).buyed;
				const newUser = this.userService.addEventConcertByUserEmail(user, newObjEventConcert);
				if (newUser !== null) {
					this.authService.updateUser(newUser);
					eventConcert.buyed = true;
				}
			}
		});
	}
}
