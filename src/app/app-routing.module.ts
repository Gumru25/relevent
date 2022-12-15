import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => 
			import('./main/main.module').then(m => m.MainModule)
	},
	{
		path: 'auth',
		loadChildren: () => 
			import('./auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: 'profile',
		loadChildren: () => 
			import('./profile/profile.module').then(m => m.ProfileModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'error',
		loadChildren: () => 
			import('./error/error.module').then(m => m.ErrorModule)
	},
	{ path: '**', redirectTo: 'error', pathMatch: 'full' },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {enableTracing: true})],
	imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
