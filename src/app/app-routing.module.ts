import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
	{ path: '**', redirectTo: 'error', pathMatch: 'full' },
	{
		path: 'error',
		loadChildren: () => 
			import('./error/error.module').then(m => m.ErrorModule)
	},
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {enableTracing: true})],
	imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
