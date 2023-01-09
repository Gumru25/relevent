import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventConcert } from 'src/app/events/event.model';
import { EventsService } from 'src/app/events/events.service';
import { UserService } from 'src/app/user/user.service';

interface DataSourceUser {
	email: string;
	fullName: string;
	admin: boolean;
	id: string;
	password: string;
	phone: string;
}

interface TableUsers {
	displayedColumns: string[];
	dataSource: DataSourceUser[];
}

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.scss']
})
export class PageAdminComponent implements OnInit {

	constructor(
		private userService: UserService,
		private eventsService: EventsService
	) {}

	public tableUsers: TableUsers = {
		displayedColumns: ['email', 'fullName', 'admin', 'id', 'password', 'phone'],
		dataSource: [

		]
	};

	public events$: Observable<EventConcert[]> = this.eventsService.events$;

	ngOnInit(): void {
		const dataSourceUsers: DataSourceUser[] = this.userService.users.map(user => ({
			email: user.email,
			fullName: user.fullName,
			admin: user.admin,
			id: user.id,
			password: user.password,
			phone: user.phone,
		}))
		this.tableUsers.dataSource = dataSourceUsers
	}

}
