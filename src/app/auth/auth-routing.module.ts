import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageRegisterComponent } from './pages/page-register/page-register.component';
import { PageSignInComponent } from './pages/page-sign-in/page-sign-in.component';

const routes: Routes = [
	{ path: '', redirectTo: 'sign-in', pathMatch: 'full' },
	{ path: 'sign-in', component: PageSignInComponent },
	{ path: 'register', component: PageRegisterComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
