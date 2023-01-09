import { RegisterFormValues } from "../auth/auth.interface";
import { EventConcert } from "../events/event.model";

export interface UserInfo {
	email: string;
	fullName: string;
	phone: string;
	password: string;
	admin?: boolean;
}

export interface EventConcertByUser extends EventConcert {
	quantity: number;
	buyed: boolean;
}
