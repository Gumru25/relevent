import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	
	public isAuthorized$: Observable<boolean> = this.authService.isAuthorized$.pipe(
		take(1)
	);

	constructor(
		private authService: AuthService
	) {

		// console.log(this.authService);
		
	}
}
