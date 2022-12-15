import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFormValues } from '../../auth.interface';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-page-sign-in',
  templateUrl: './page-sign-in.component.html',
  styleUrls: ['./page-sign-in.component.scss']
})
export class PageSignInComponent {
	public disabledForm: boolean = false;
	public form = new FormGroup({
		email: new FormControl(null, [Validators.required, Validators.email]),
		password: new FormControl(null, [Validators.required, Validators.minLength(4)])
	});

	constructor(
		private authService: AuthService,
		private router: Router
	) { }

	public onSubmit(): void {
		this.disabledForm = true;

		const formValues: AuthFormValues = {
			email: this.form.value.email! as string,
			password: this.form.value.password! as string
		};

		this.authService.authorize(formValues);

		// this.authService.isAuthorized$.subscribe(isAuth => {
		// 	if (isAuth === false) {
		// 		window.location.reload();
		// 	}
		// });
	}
}
