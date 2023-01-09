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
	tap,
} from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class EventsService {
	private _eventsBehSubj: BehaviorSubject<EventConcert[]> = new BehaviorSubject<EventConcert[]>([]);

	public get events$(): Observable<EventConcert[]> {
		return this._eventsBehSubj.asObservable();
	}

	constructor(

	) {
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
			description: ' концерта 1',
			date: new Date('2022-01-01')
		});

		this.create({
			imgUrl: 'assets/img/evgeny_grinko.jfif',
			title: 'Evgeny Grinko',
			description: 'Renowned pianist Evgeny Grinko will perform a concert program in front of his fans at the Heydar Aliyev Palace on January 26.',
			date: new Date('2022-01-05')
		});

		this.create({
			imgUrl: 'assets/img/onegin.jfif',
			title: 'Eugene Onegin',
			description: 'On February 19, the performance "Eugene Onegin" will take place in the Concert Hall of the Opera Studio at the Baku Musical Academy.',
			date: new Date('2022-01-07')
		});

		this.create({
			imgUrl: 'assets/img/edis.jfif',
			title: 'Edis',
			description: 'Описание концерта 4',
			date: new Date('2022-02-09')
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
							_events.map(_event => ({..._event, buyed: false, quantity: 1}))
						)
				);
				}
			}),
			// tap((events) => {
			// 	console.log(events);

			// })
		);
	}

	private mapEventConcertsByUser(user: User): Observable<EventConcertPage[]> {
		return this._eventsBehSubj.pipe(
			map((_events) => {
				return _events.map((_event) => {
					const eventByUser = user.addedEventConcerts.find(
						(addedEvent) => addedEvent.id === _event.id
					);

					if (eventByUser !== undefined) {
						// Если такой event нашёлся в добавленных у юзера
						const copyObjEventByUser = Object.assign({}, eventByUser);
						return copyObjEventByUser as EventConcertPage;
					} else {
						(_event as EventConcertPage).quantity = 1;
						return _event as EventConcertPage;
					}
				});
			})
		);
	}
}
