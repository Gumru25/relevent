import { User } from "../user/user.model";
import { UserService } from "../user/user.service";
import { RegisterFormValues } from "./auth.interface";
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
	private _user: User | null = null;
	private _isAuthorized: boolean = false;

	public get user() {
		return this._user;
	}
	public get isAuthorized() {
		return this._isAuthorized;
	}

	constructor(
		private userService: UserService
	) {
		this.onInit();
	}

	private onInit(): void {
		const localStorageAutUser = localStorage.getItem('auth-user');

		if (localStorageAutUser !== null) { // если в локальном хранилище что-то есть
			const localStorageUsersParsed = JSON.parse(localStorageAutUser);
			this._user = localStorageUsersParsed as User;
		}
	}

	public authorized(formValues: RegisterFormValues): void {
		const userByEmail = this.userService.getUserByEmail(formValues.email);

		if (userByEmail !== undefined) { // если такой user существует
			this._user = userByEmail;
			this._isAuthorized = true;
			localStorage.setItem('auth-user', JSON.stringify(this._user));
		}

	}

	public deAuthorized(): void {
		this._user = null;
		this._isAuthorized = false;
		localStorage.removeItem('auth-user');
	}

	public register(formValues: RegisterFormValues): void {
		const createdUser = this.userService.createUser(formValues);

		this.authorized(createdUser);
	}
}