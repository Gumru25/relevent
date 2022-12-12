import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegisterComponent implements OnInit {
	form = new FormGroup({
		email: new FormControl(null, [Validators.required, Validators.email]),
		fullName: new FormControl(null, [Validators.required]),
		phone: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]{13,}')]),
		password: new FormControl(null, [Validators.required, Validators.minLength(4)])
	});

	ngOnInit(): void {
		(window as any).password = this.form.controls.password;
		
	}

}
