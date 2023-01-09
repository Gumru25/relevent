import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/user/user.model';
import { EventConcert } from '../../event.model';
import { EventsService } from '../../events.service';
import { first, Observable, take } from "rxjs";
import { UserService } from 'src/app/user/user.service';
import { EventConcertPage, RangeDate } from '../../events.interfaces';
import { DateAdapter } from '@angular/material/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRange, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { EventsFilterService } from '../../events-filter.service';

@Component({
  selector: 'app-page-events',
  templateUrl: './page-events.component.html',
  styleUrls: ['./page-events.component.scss']
})
export class PageEventsComponent implements OnInit {
	public eventConcerts$: Observable<EventConcertPage[]> = this.eventsService.getEventConcertsByUser(this.authService.user$);
	public filteredEventConcerts$: Observable<EventConcertPage[]> = this.eventsFilterService.filteredEvents$;
	public user$: Observable<User | null> = this.authService.user$;

	public form = new FormGroup({
		rangeDate: new FormGroup({
			start: new FormControl<Date | null>(null),
			end: new FormControl<Date | null>(null)
		}),
		description: new FormControl<string | null>(null),
		title: new FormControl<string | null>(null)
	});

	constructor(
		private eventsService: EventsService,
		private authService: AuthService,
		private userService: UserService,
		private eventsFilterService: EventsFilterService,
	) {
	}

	ngOnInit(): void {
		this.eventConcerts$.subscribe(events => {
			const eventsWithBuyed = events.map(event => {
				if (!event.buyed) event.buyed = false;
				return event;
			});

			this.eventsFilterService.initEvents(eventsWithBuyed);
		});
	}

	public filterDate(): void {
		const date = {
			start: this.form.controls.rangeDate.controls.start.value,
			end: this.form.controls.rangeDate.controls.end.value
		};

		if (date.start !== null && date.end !== null) {
			this.eventsFilterService.filterByDateRange(date as RangeDate);
		} else {
			this.eventsFilterService.filterByDateRange(null);
		}

	}

	public filterTitle(): void {
		const title = this.form.controls.title.value;

		if (title !== null) {
			this.eventsFilterService.filterByTitle(title);
		}
	}

	public filterDescription(): void {
		const description = this.form.controls.description.value;

		if (description !== null) {
			this.eventsFilterService.filterByDescription(description);
		}
	}

	public addEventConcertToUser(eventConcert: EventConcertPage): void {

		this.user$
		.pipe(
			first()
		)
		.subscribe(user => {

			if (user === null) {
				return;
			}

			console.log(eventConcert);


			if (eventConcert.buyed === true) {
				eventConcert.buyed = false;
				const newObjEventConcert = Object.assign({}, eventConcert);
				const newUser = this.userService.removeEventConcertByUserEmail(user, newObjEventConcert);

				if (newUser !== null) {
					this.authService.updateUser(newUser);
				}
			} else if (!eventConcert.buyed) {
				eventConcert.buyed = true;
				const newObjEventConcert = Object.assign({}, eventConcert);
				const newUser = this.userService.addEventConcertByUserEmail(user, newObjEventConcert);

				if (newUser !== null) {
					this.authService.updateUser(newUser);
				}
			}

		});
	}

	public changeQuantityEvent(sign: '+' | '-', event: EventConcertPage): void {
		if (sign === '+') {
			event.quantity++;
		} else if (sign === '-' && event.quantity > 1) {
			event.quantity--;
		}
	}

}
