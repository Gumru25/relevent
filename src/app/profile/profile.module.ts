import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageProfileComponent } from './pages/page-profile/page-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { HeaderModule } from '../shared/components/header/header.module';
import { FooterModule } from '../shared/components/footer/footer.module';
import { AuthService } from '../auth/auth.service';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    PageProfileComponent
  ],
  imports: [
    CommonModule,
		ProfileRoutingModule,
		HeaderModule,
		FooterModule,
		MatButtonModule
  ],
	providers: [
		AuthService
	]
})
export class ProfileModule { }
