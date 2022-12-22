import { EventConcertInfo } from "./events.interfaces";

export class EventConcert implements EventConcertInfo {

	public imgUrl: string;
	public title: string;
	public description: string;
	public id: string;
	public date: Date;

	constructor(eventInfo: EventConcertInfo) {
		this.imgUrl = eventInfo.imgUrl;
		this.title = eventInfo.title;
		this.description = eventInfo.description;
		this.date = eventInfo.date;
		this.id = `xz${Math.floor(Math.random() * 1000000)}xz`;
	}
}