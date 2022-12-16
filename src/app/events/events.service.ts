import { Injectable } from '@angular/core';
import { User } from '../user/user.model';
import { EventConcert } from './event.model';
import { EventConcertInfo, EventConcertPage } from './events.interfaces';
import { Observable, take, firstValueFrom, of, switchMap, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
	private _events: EventConcert[] = [
	];

	public get events(): EventConcert[] {
		return this._events;
	}

  constructor() {
		this.onInit();
	}

	private onInit() {
		const localStorageEventConcerts = localStorage.getItem('event-concerts');

		if (localStorageEventConcerts !== null) { // если в локальном хранилище что-то есть
			const localStorageEventConcertsParsed = JSON.parse(localStorageEventConcerts);
			this._events = localStorageEventConcertsParsed;
		} else {
			this.create4EventConcerts();
		}
	}

	private create4EventConcerts() {
		this.create({ 
			imgUrl: 'assets/img/valery.jpg',
			title: 'Valery Meladze'
		 });

		 this.create({ 
			imgUrl: 'assets/img/evgeny_grinko.jfif',
			title: 'Evgeny Grinko'
		 });

		 this.create({ 
			imgUrl: 'assets/img/onegin.jfif',
			title: 'Eugene Onegin'
		 });

		 this.create({ 
			imgUrl: 'assets/img/edis.jfif',
			title: 'Edis'
		 });
	}


	public create(eventInfo: EventConcertInfo): EventConcert {
		const eventConcert = new EventConcert(eventInfo);
		
		this._events.push(eventConcert);
		localStorage.setItem('event-concerts', JSON.stringify(this._events));

		return eventConcert;
	}

	public getEventConcertsByUser(user$: Observable<User | null>): Observable<EventConcertPage[]> {

		return user$.pipe(
			map(user => {
				if (user !== null) {
					const eventConcertsPage = this._events.map(_event => {
						const eventByUser = user.addedEventConcerts.find(addedEvent => addedEvent.id === _event.id);
			
						// Если такой event нашёлся в добавленных у юзера
						if (eventByUser !== undefined) {
							const copyObjEventByUser = Object.assign({}, eventByUser);
							(copyObjEventByUser as EventConcertPage).buyed = true;
							return copyObjEventByUser as EventConcertPage;
						} else {
							(_event as EventConcertPage).buyed = false;
							return _event as EventConcertPage;
							// (copyObjEventByUser as EventConcertPage).buyed = false;
						}
					});

					return eventConcertsPage;
				} else {
					return this._events.map(_event => ({..._event, buyed: false}));
				}
			})
		)




	}
}
