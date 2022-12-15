import { UserInfo } from "./user.interfaces";
import { User } from "./user.model";
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private _users: User[] = [];
	public get users(): User[] {
		return this._users;
	}

	constructor() {
		this.onInit();
	}

	private onInit() {
		const localStorageUsers = localStorage.getItem('users');

		if (localStorageUsers !== null) { // если в локальном хранилище что-то есть
			const localStorageUsersParsed = JSON.parse(localStorageUsers);
			this._users = localStorageUsersParsed;
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
}