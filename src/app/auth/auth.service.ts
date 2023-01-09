import { User } from "../user/user.model";
import { UserService } from "../user/user.service";
import { AuthFormValues, RegisterFormValues } from "./auth.interface";
import { Injectable, ApplicationRef } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject, filter, last, map, Observable, of, ReplaySubject, Subject, switchMap, takeWhile, tap } from "rxjs";
import { EventConcertByUser } from "../user/user.interfaces";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	public _user$: BehaviorSubject<User | null> = new BehaviorSubject(null as any);
	private _isAuthorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);

	public user$: Observable<User | null> = this._user$.pipe(
			switchMap((user) => {
				const localStorageAuthUser = localStorage.getItem('auth-user');

				if (localStorageAuthUser !== null) {
					return of(JSON.parse(localStorageAuthUser) as User)
				} else {
					return of(null);
				}
			}),
		);

	public isAuthorized$: Observable<boolean> = this._isAuthorized$.pipe(
			switchMap((isAuth) => {
				const localStorageAuthUser = localStorage.getItem('auth-user');

				if (localStorageAuthUser !== null) {
					return of(true)
				} else {
					return of(false);
				}
			})
		);

	public isAdmin$: Observable<boolean> = this._isAuthorized$.pipe(
		switchMap((isAuth) => {
			const localStorageAuthUser = localStorage.getItem('auth-user');

			if (localStorageAuthUser !== null) {
				const parsedAdminLocalStorageAuthUser: User = JSON.parse(localStorageAuthUser);
				return of(parsedAdminLocalStorageAuthUser.admin);
			} else {
				return of(false);
			}
		})
	);

	// public get user$(): Observable<User | null> {
	// 	return this._user$.asObservable();
	// }

	// public readonly isAuthorized$: Observable<boolean> = this._isAuthorized$.asObservable();

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

	public updateUser(newUser: User) {
		this._user$.next(newUser);
		localStorage.setItem('auth-user', JSON.stringify(newUser));
	}

	public updateEventsByUser(events: EventConcertByUser[]) {
		const lastUser = this._user$.value;

		if (lastUser?.addedEventConcerts) {
			const newUser = lastUser;
			newUser.addedEventConcerts = events;
			this._user$.next(newUser);
			localStorage.setItem('auth-user', JSON.stringify(newUser));
		}
	}
}
