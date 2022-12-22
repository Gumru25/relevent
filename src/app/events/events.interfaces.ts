import { EventConcert } from "./event.model";

export interface EventConcertInfo {
	imgUrl: string;
	title: string;
	description: string;
	date: Date;
}

export interface EventConcertPage extends EventConcert {
	buyed: boolean;
	id: string;
}