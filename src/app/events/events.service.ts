import { Injectable } from '@angular/core';
import { User } from '../user/user.model';
import { EventConcert } from './event.model';
import { EventConcertInfo, EventConcertPage } from './events.interfaces';
import {
	Observable,
	take,
	firstValueFrom,
	of,
	switchMap,
	map,
	BehaviorSubject,
} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class EventsService {
	private _eventsBehSubj: BehaviorSubject<EventConcert[]> = new BehaviorSubject<EventConcert[]>([]);

	public get events$(): Observable<EventConcert[]> {
		return this._eventsBehSubj.asObservable();
	}

	constructor() {
		this.onInit();
	}

	private onInit() {
		const localStorageEventConcerts = localStorage.getItem('event-concerts');
	
		if (localStorageEventConcerts !== null) {
			// Если в локальном хранилище что-то есть
			const localStorageEventConcertsParsed = JSON.parse(
				localStorageEventConcerts
			);
			this._eventsBehSubj.next(localStorageEventConcertsParsed);
		} else {
			this.create4EventConcerts();
		}
	}

	private create4EventConcerts() {
		this.create({
			imgUrl: 'assets/img/valery.jpg',
			title: 'Valery Meladze',
			description: 'Описание концерта 1',
			date: new Date()
		});

		this.create({
			imgUrl: 'assets/img/evgeny_grinko.jfif',
			title: 'Evgeny Grinko',
			description: 'Описание концерта 2',
			date: new Date()
		});

		this.create({
			imgUrl: 'assets/img/onegin.jfif',
			title: 'Eugene Onegin',
			description: 'Описание концерта 3',
			date: new Date()
		});

		this.create({
			imgUrl: 'assets/img/edis.jfif',
			title: 'Edis',
			description: 'Описание концерта 4',
			date: new Date()
		});
	}

	public create(eventInfo: EventConcertInfo): EventConcert {
		const eventConcert = new EventConcert(eventInfo);
		const newEvents = this._eventsBehSubj.getValue().concat(eventConcert);
		this._eventsBehSubj.next(newEvents);
		localStorage.setItem('event-concerts', JSON.stringify(newEvents));
	
		return eventConcert;
	}

	public getEventConcertById(id: string): Observable<EventConcert | null> {
		return this._eventsBehSubj.pipe(
			map(events => {
				const findedEvent = events.find(event => event.id === id);

				return findedEvent !== undefined ? findedEvent : null;
			})
		);
	}

	public getEventConcertsByUser(
		user$: Observable<User | null>
	): Observable<EventConcertPage[]> {
		return user$.pipe(
			switchMap((user) => {
				if (user !== null) {
					return this.mapEventConcertsByUser(user);
				} else {
					return this._eventsBehSubj
					.pipe(
						map((_events) => 
							_events.map(_event => ({..._event, buyed: false}))
						)
				);
				}
			})
		);
	}

	private mapEventConcertsByUser(user: User) {
		return this._eventsBehSubj.pipe(
			map((_events) => {
				return _events.map((_event) => {
					const eventByUser = user.addedEventConcerts.find(
						(addedEvent) => addedEvent.id === _event.id
					);
	
					if (eventByUser !== undefined) {
						// Если такой event нашёлся в добавленных у юзера
						const copyObjEventByUser = Object.assign({}, eventByUser);
						(copyObjEventByUser as EventConcertPage).buyed = true;
						return copyObjEventByUser as EventConcertPage;
					} else {
						(_event as EventConcertPage).buyed = false;
						return _event as EventConcertPage;
					}
				});
			})
		);
	}
}
