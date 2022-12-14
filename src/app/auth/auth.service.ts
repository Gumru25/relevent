import { User } from "../user/user.model";
import { UserService } from "../user/user.service";
import { AuthFormValues, RegisterFormValues } from "./auth.interface";
import { Injectable, ApplicationRef } from '@angular/core';
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
	private _user: User | null = null;
	private _isAuthorized: boolean = false;

	public get user(): User | null {
		return this._user;
	}
	public get isAuthorized(): boolean {
		return this._isAuthorized;
	}

	constructor(
		private userService: UserService,
		private router: Router,
		private appRef: ApplicationRef
	) {
		this.onInit();
	}

	private onInit(): void {
		const localStorageAutUser = localStorage.getItem('auth-user');

		if (localStorageAutUser !== null) { // если в локальном хранилище что-то есть
			const localStorageUsersParsed = JSON.parse(localStorageAutUser);
			this._user = localStorageUsersParsed as User;
			this._isAuthorized = true;
			this.appRef.tick();
		}
	}

	public authorize(formValues: AuthFormValues): void {
		const userByEmail = this.userService.getUserByEmail(formValues.email);

		if (userByEmail !== undefined && userByEmail.password === formValues.password) { // если такой user существует и пароль как в локальном хранилище
			this._user = userByEmail;
			this._isAuthorized = true;
			localStorage.setItem('auth-user', JSON.stringify(this._user));
			this.router.navigate(['/profile']);
			this.appRef.tick();
		}
	}

	public deAuthorize(): void {
		this._user = null;
		this._isAuthorized = false;
		localStorage.removeItem('auth-user');
		this.router.navigate(['/']);
		this.appRef.tick();
	}

	public register(formValues: RegisterFormValues): void {
		const createdUser = this.userService.createUser(formValues);

		this.authorize(createdUser);
	}
}