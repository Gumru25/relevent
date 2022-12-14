import { User } from "../user/user.model";
import { UserService } from "../user/user.service";
import { AuthFormValues, RegisterFormValues } from "./auth.interface";
import { Injectable, ApplicationRef } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, ReplaySubject, Subject, takeWhile, tap } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _user$: ReplaySubject<User | null> = new ReplaySubject(1);
	private _isAuthorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);

	public readonly user$: Observable<User> = this._user$.pipe(
		takeWhile(user => user !== null),
	) as Observable<User>;
	// public readonly isAuthorized$: Observable<boolean> = this._isAuthorized$.asObservable();
	// public get user$(): Observable<User> {
	// 	return this._user$.pipe(
			// tap(item => {
			// 	window.location.reload();
			// }),
	// 		takeWhile(user => user !== null),
			
	// 	) as Observable<User>;
	// }
	public readonly isAuthorized$: Observable<boolean> = this._isAuthorized$.asObservable();

	constructor(
		private userService: UserService,
		private router: Router
	) {
		this.onInit();
	}

	private onInit(): void {
		const localStorageAutUser = localStorage.getItem('auth-user');

		if (localStorageAutUser !== null) { // если в локальном хранилище что-то есть
			const localStorageUserParsed = JSON.parse(localStorageAutUser) as User;
			
			this._user$.next(localStorageUserParsed)
			this._isAuthorized$.next(true);
			
		}
	}

	public authorize(formValues: AuthFormValues): void {
		const userByEmail = this.userService.getUserByEmail(formValues.email);

		if (userByEmail !== undefined && userByEmail.password === formValues.password) { // если такой user существует и пароль как в локальном хранилище
			this._user$.next(userByEmail);
			this._isAuthorized$.next(true);
			localStorage.setItem('auth-user', JSON.stringify(userByEmail));
			this.router.navigate(['/profile']);
		}
	}

	public deAuthorize(): void {
		this._user$.next(null);
		this._isAuthorized$.next(false);
		localStorage.removeItem('auth-user');
		this.router.navigate(['/auth']);
	}

	public register(formValues: RegisterFormValues): void {
		const createdUser = this.userService.createUser(formValues);

		this.authorize(createdUser);
	}
}