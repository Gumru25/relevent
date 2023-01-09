import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderModule } from '../shared/components/header/header.module';
import { FooterModule } from '../shared/components/footer/footer.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { PageAdminComponent } from './pages/page-admin/page-admin.component';



@NgModule({
  declarations: [
    PageAdminComponent
  ],
  imports: [
    CommonModule,
		AdminRoutingModule,
		HeaderModule,
		FooterModule,
		MatTableModule,
		MatIconModule
  ]
})
export class AdminModule { }
