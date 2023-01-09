import { EventConcertByUser, UserInfo } from "./user.interfaces";
import { User } from "./user.model";
import { Injectable } from '@angular/core';
import { EventConcert } from "../events/event.model";
import { AuthService } from "../auth/auth.service";
import { EventConcertPage } from "../events/events.interfaces";
import { Observable, of, switchMap } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private _users: User[] = [];
	public get users(): User[] {
		return this._users;
	}
	private _adminUser: null | User = null;

	constructor(
	) {
		this.onInit();
	}

	private onInit() {
		const localStorageUsers = localStorage.getItem('users');

		if (localStorageUsers !== null) { // если в локальном хранилище что-то есть
			const localStorageUsersParsed = JSON.parse(localStorageUsers);
			this._users = localStorageUsersParsed;
		} else {
			this._users = [];
		}

		this.initCreateAdminUser();
	}

	private initCreateAdminUser(): void {
		const adminInLocalStorage = localStorage.getItem('admin');

		if (adminInLocalStorage === null) {
			const adminUser = this.createUser({
				email: 'fargum0825@gmail.com',
				password: '1234',
				fullName: 'Qumru Farzaliyeva',
				phone: '+99421312312312312312',
				admin: true
			});
			localStorage.setItem('admin', JSON.stringify(adminUser));
			this._adminUser = adminUser;
		} else {
			const parsedAdminInLocalStorage: User = JSON.parse(adminInLocalStorage);
			this._adminUser = parsedAdminInLocalStorage;
		}
	}

	public getAdminUser(): User {
		if (this._adminUser === null) {
			this.initCreateAdminUser();
			return this._adminUser as unknown as User;
		}
		return this._adminUser;
	}

	public createUser(userInfo: UserInfo): User {
		const user = new User(userInfo);
		this._users.push(user);
		localStorage.setItem('users', JSON.stringify(this._users));
		return user;
	}

	public getUserByEmail(email: string): User | undefined {
		return this._users.find(user => user.email === email);
	}

	public addEventConcertByUserEmail(user: User, eventConcert: EventConcertByUser): User | null {
		const userIdxInArr = this._users.findIndex(_user => _user.email === user.email);

		if (userIdxInArr !== -1) {

			const eventConcertByUserIdx = user.addedEventConcerts.findIndex(addedEvt => addedEvt.id === eventConcert.id);

			// Если такого концерта не найдёно в добавленных концертах у юзера
			if (eventConcertByUserIdx === -1) {
				const copyObj: EventConcertByUser = Object.assign(eventConcert);
				copyObj.buyed = true;
				copyObj.quantity = eventConcert.quantity;
				this._users[userIdxInArr].addedEventConcerts.push(copyObj);
				localStorage.setItem('users', JSON.stringify(this._users));
				return this._users[userIdxInArr];
			} else { // такой концерт уже был добавлен 1 раз

				this._users[userIdxInArr].addedEventConcerts[eventConcertByUserIdx].buyed = true;
				const newQuantity = eventConcert.quantity;
				this._users[userIdxInArr].addedEventConcerts[eventConcertByUserIdx].quantity = newQuantity;
				localStorage.setItem('users', JSON.stringify(this._users));
				return this._users[userIdxInArr];
			}

		}

		return null;
	}

	public removeEventConcertByUserEmail(user: User, eventConcert: EventConcertPage): User | null {
		const userIdxInArr = this._users.findIndex(_user => _user.email === user.email);

		if (userIdxInArr !== -1) {
			const eventConcertByUserIdx = this._users[userIdxInArr].addedEventConcerts.findIndex(addedEvt => addedEvt.id === eventConcert.id);

			if (eventConcertByUserIdx !== -1) {
				this._users[userIdxInArr].addedEventConcerts[eventConcertByUserIdx].buyed = false;
				localStorage.setItem('users', JSON.stringify(this._users));
				return this._users[userIdxInArr];
			}
		}

		return null;
	}

	public checkEventConcertByUser(user: User, eventConcert: EventConcertByUser): boolean {
		const eventConcertByUser = user.addedEventConcerts.find(addedEvt => addedEvt.id === eventConcert.id);

		return eventConcertByUser !== undefined;
	}

	public updateEventsByUser(user: User, events: EventConcertPage[]): User | null {
		const userIdxInArr = this._users.findIndex(_user => _user.email === user.email);

		if (userIdxInArr !== -1) {
			this._users[userIdxInArr].addedEventConcerts = events;
			localStorage.setItem('users', JSON.stringify(this._users));
			return this._users[userIdxInArr];
		}

		return null;
	}

	public getBuyedEventConcerts(user: User): EventConcertByUser[] {
		return user.addedEventConcerts.filter(event => event.buyed === true);
	}

	public getBuyedEventConcerts$(user: Observable<User | null>): Observable<EventConcertByUser[]> {
		return user.pipe(
			switchMap(user => {
				if (user === null) {
					return of([]);
				} else {
					return of(user.addedEventConcerts.filter(event => event.buyed === true));
				}
			})
		)
	}

}
