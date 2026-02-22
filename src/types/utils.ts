import type {RouteRecordInfo} from "vue-router";

export interface ITokenData {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_ttl: number;
}

export type TNoticeTypes = 'notify' | 'warning' | 'error';
export interface INotice {
	id: number;
	message: string;
	type: TNoticeTypes;
}

export interface IUserData {
	id: number
	name: string
	lastname: any
	email: string
	start_coordinates: StartCoordinates
	created_at: string
}

export interface StartCoordinates {
	lat: number | null
	lng: number | null
}

export interface IRouteLine {
	to: {name: RouteRecordInfo["name"]} | RouteRecordInfo["path"],
	name: string
}