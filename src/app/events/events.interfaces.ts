import { EventConcert } from "./event.model";

export interface EventConcertInfo {
	imgUrl: string;
	title: string;
}

export interface EventConcertPage extends EventConcert {
	buyed: boolean;
	id: string;
}