import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(
		private authService: AuthService,
		private router: Router
	) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.authService.isAuthorized$.pipe(
			tap(isAuth => {
				if (isAuth === false) {
					this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
				}
			})
		)
  }
  
}
