import { EventConcertInfo } from "./events.interfaces";

export class EventConcert implements EventConcertInfo {

	public imgUrl: string;
	public title: string;
	public id: string;

	constructor(eventInfo: EventConcertInfo) {
		this.imgUrl = eventInfo.imgUrl;
		this.title = eventInfo.title;
		this.id = `xz${Math.floor(Math.random() * 1000000)}xz`;
	}
}