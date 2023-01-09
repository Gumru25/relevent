import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { map, Observable, Subject, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EventConcert } from 'src/app/events/event.model';
import { EventsService } from 'src/app/events/events.service';
import { EventConcertByUser } from 'src/app/user/user.interfaces';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss']
})
export class PageProfileComponent implements OnInit {

	public user$: Observable<User | null> = this.authService.user$.pipe(take(1));
	public buyedEvents$: Observable<EventConcertByUser[]> = this.userService.getBuyedEventConcerts$(this.user$);
	public isAdmin$: Observable<boolean> = this.authService.isAdmin$;

	constructor(
		private authService: AuthService,
		private eventsService: EventsService,
		private userService: UserService
	) {}

	ngOnInit(): void {

		// this.user$.subscribe(user => {
		// 	console.log(user);

		// })

		// this.cdr.detectChanges();
	}

	public signOut(): void {
		this.authService.deAuthorize();
	}

	public createEventConcertUrl$(id: string): Observable<string | null> {
		return this.eventsService.getEventConcertById(id)
		.pipe(
			map(event => {
				if (event !== null) {
					return `/events/${event.id}`;
				}
				return event;
			})
		)
	}
	// public getEventConcertById(id: string): Observable<EventConcert | null> {
	// 	return this.eventsService.getEventConcertById(id);
	// }
}
