import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	
	public isAuthorized: boolean = this.authService.isAuthorized;

	constructor(
		private authService: AuthService
	) {

		// console.log(this.authService);
		
	}
}
