import { UserInfo } from "./user.interfaces";
import { User } from "./user.model";
import { Injectable } from '@angular/core';
import { EventConcert } from "../events/event.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private _users: User[] = [];
	public get users(): User[] {
		return this._users;
	}

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

	public addEventConcertByUserEmail(user: User, eventConcert: EventConcert): User | null {
		const userIdxInArr = this._users.findIndex(_user => _user.email === user.email);

		if (userIdxInArr !== -1) {

			// Если такого концерта не найдёно в добавленных концертах у юзера
			if (!this.checkEventConcertByUser(this._users[userIdxInArr], eventConcert)) {
				this._users[userIdxInArr].addedEventConcerts.push(eventConcert);
				localStorage.setItem('users', JSON.stringify(this._users));
				return this._users[userIdxInArr];
			}
		}

		return null;
	}

	public checkEventConcertByUser(user: User, eventConcert: EventConcert): boolean {
		
		const eventConcertByUser = user.addedEventConcerts.find(addedEvt => addedEvt.id === eventConcert.id);

		return eventConcertByUser !== undefined;
	}
}