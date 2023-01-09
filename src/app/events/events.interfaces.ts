import { EventConcertByUser } from "../user/user.interfaces";
import { EventConcert } from "./event.model";

export interface EventConcertInfo {
	imgUrl: string;
	title: string;
	description: string;
	date: Date;
}

export interface EventConcertPage extends EventConcertByUser {
	buyed: boolean;
	id: string;
}

export interface RangeDate {
	start: Date;
	end: Date;
}
