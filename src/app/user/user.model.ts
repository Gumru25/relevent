import { EventConcert } from "../events/event.model";
import { UserInfo } from "./user.interfaces";

export class User implements UserInfo {
	email: string;
	fullName: string;
	phone: string;
	password: string;
	addedEventConcerts: EventConcert[] = [];
	id: string;

	constructor(userInfo: UserInfo) {
		this.email = userInfo.email;
		this.fullName = userInfo.fullName;
		this.phone = userInfo.phone;
		this.password = userInfo.password;
		this.id = `xz${Math.floor(Math.random() * 1000000)}xz`;
	}
}