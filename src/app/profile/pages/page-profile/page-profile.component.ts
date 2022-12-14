import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.scss']
})
export class PageProfileComponent implements OnInit {

	public user$: Observable<User> = this.authService.user$;

	constructor(
		private authService: AuthService
	) {}

	public signOut(): void {
		this.authService.deAuthorize();
	}

	ngOnInit(): void {

		// this.cdr.detectChanges();
	}
}
