import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { DateRange } from '@angular/material/datepicker';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { compareDatesByDay } from '../shared/funcs/compareDatesByDay';
import { UserService } from '../user/user.service';
import { EventConcert } from './event.model';
import { EventConcertPage, RangeDate } from './events.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EventsFilterService {

	private _behSubjEvents: BehaviorSubject<EventConcertPage[]> = new BehaviorSubject<EventConcertPage[]>([]);
	private _initialEvents: EventConcertPage[] = [];
	public filteredEvents$: Observable<EventConcertPage[]> = this._behSubjEvents.asObservable();
	private filteredEventsByDateBehSubj = new BehaviorSubject<EventConcertPage[]>([]);
	private filteredEventsByTitleBehSubj = new BehaviorSubject<EventConcertPage[]>([]);
	private filteredEventsByDescriptionBehSubj = new BehaviorSubject<EventConcertPage[]>([]);

  constructor(
		private dateAdapter: DateAdapter<Date, string>,
		private authService: AuthService,
		private userService: UserService
	) { }

	public initEvents(events: EventConcertPage[]): void {
		this._initialEvents = events;
		this.authService.updateEventsByUser(events);
		const user = this.authService._user$.value;
		if (user !== null) {
			this.userService.updateEventsByUser(user, events);
		}
		this.filteredEventsByDateBehSubj.next(this._initialEvents);
		this.filteredEventsByTitleBehSubj.next(this._initialEvents);
		this.filteredEventsByDescriptionBehSubj.next(this._initialEvents);
		this.filterByAll();
		this._behSubjEvents.next(events);
	}

	public filterByDateRange(date: RangeDate | null): EventConcertPage[] {

		if (date === null) {
			this.filteredEventsByDateBehSubj.next(this._initialEvents);
			this.filterByAll();
			return [];
		}

		const lastEvents = this._initialEvents;
		const filteredEvents: EventConcertPage[] = [];

		for (const event of lastEvents) {
			const eventDate = new Date(event.date);
			const compareStartAndEvent = compareDatesByDay(date.start, eventDate);
			const compareEndAndEvent = compareDatesByDay(date.end, eventDate);

			if (
				(compareStartAndEvent === 0 || compareStartAndEvent === -1) &&
				(compareEndAndEvent === 0 || compareEndAndEvent === 1)
			) {
				filteredEvents.push(event);
			}
		}


		this.filteredEventsByDateBehSubj.next(filteredEvents);
		this.filterByAll();
		// объединить три фильтра (по дате, имени и описанию), пока что ничего
		// this._behSubjEvents.next(filteredEvents); // переписать на функцию

		return filteredEvents;
	}

	public filterByDescription(description: string): EventConcertPage[] {
		const lastEvents = this._initialEvents;
		const filteredByDescription = this.getMatchingObjects(lastEvents, description, 'description');

		this.filteredEventsByDescriptionBehSubj.next(filteredByDescription);
		this.filterByAll();

		return filteredByDescription;
	}

	public filterByTitle(title: string): EventConcertPage[] {
		const lastEvents = this._initialEvents;
		const filteredByTitle = this.getMatchingObjects(lastEvents, title, 'title');

		this.filteredEventsByTitleBehSubj.next(filteredByTitle);
		this.filterByAll();

		return filteredByTitle;
	}

	private getMatchingObjects(objects: EventConcertPage[], value: string, key: string): EventConcertPage[] {
		if (!(key in objects[0])) {
			throw new Error(`Key "${key}" does not exist in the objects`);
		}

		const strippedValue= value.replace(/\s+/g, ' ').trim();
		const pattern = new RegExp(strippedValue, 'i');

		return objects.filter((obj: any) => {
			const strippedKey = obj[key].replace(/\s+/g, ' ').trim();
			return pattern.test(strippedKey);
		});;

	}

	private filterByAll(): EventConcertPage[] {
		const filteredByDate = this.filteredEventsByDateBehSubj.value;
		const filteredByTitle = this.filteredEventsByTitleBehSubj.value;
		const filteredByDescription = this.filteredEventsByDescriptionBehSubj.value;
		const filteredAll: EventConcertPage[] = this.filterEventConcertPages(filteredByDate, filteredByTitle, filteredByDescription);

		this._behSubjEvents.next(filteredAll);

		return filteredAll;;
	}


	private filterEventConcertPages(...arrs: EventConcertPage[][]): EventConcertPage[] {
		const all: EventConcertPage[] = ([] as EventConcertPage[]).concat(...arrs);

		const occurrences = all.reduce((acc: Record<string, {quantity: number, event: typeof eventConcertPage}>, eventConcertPage) => {
			const eventConcertPageDate = new Date(eventConcertPage.date);
			const key = [eventConcertPage.title, eventConcertPage.description, eventConcertPageDate].join(',');
			if (!acc[key]) {
				acc[key] = {
					quantity: 1,
					event: eventConcertPage
				};
			} else {
				acc[key].quantity++;
			}
			return acc;
		}, {});

		const eventIntersections: EventConcertPage[] = Object.values(occurrences).map(occurrence => occurrence.event);

		const filteredAll: EventConcertPage[] = eventIntersections.filter(eventConcertPage => {
			const eventConcertPageDate = new Date(eventConcertPage.date);
			const key = [eventConcertPage.title, eventConcertPage.description, eventConcertPageDate].join(',');
			return occurrences[key].quantity === arrs.length;
		});

		return filteredAll;
	}

}
