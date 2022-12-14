import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterFormValues } from '../../auth.interface';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegisterComponent implements OnInit {
	constructor(
		private authService: AuthService
	) {}

	public disabledForm: boolean = false;

	public form = new FormGroup({
		email: new FormControl(null, [Validators.required, Validators.email]),
		fullName: new FormControl(null, [Validators.required]),
		phone: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]{13,}')]),
		password: new FormControl(null, [Validators.required, Validators.minLength(4)])
	});

	public onSubmit(): void {
		// после отправки формы, сразу заблокировать кнопку submit
		this.disabledForm = true;

		const formValues: RegisterFormValues = {
			email: this.form.value.email! as string,
			fullName: this.form.value.fullName! as string,
			phone: this.form.value.phone! as string,
			password: this.form.value.password! as string,
		};

		this.authService.register(formValues);
		
	}

	ngOnInit(): void {
		
	}

}
