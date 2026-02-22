import {API} from "@/assets/js/API.ts";
import {ME_ENDPOINT, REFRESH_TOKEN_ENDPOINT} from "@/assets/js/endpoints.ts";

export const getMe = async (): Promise<any> => {
	return await API.get(ME_ENDPOINT);
}

export const refreshToken = async (): Promise<any> => {
	return await API.get(REFRESH_TOKEN_ENDPOINT);
}



export const sendParametredRequest = async (url: string, params = {}) => {
	const paramQuery = new URLSearchParams(params);
	return await API.get(`${url}?${paramQuery.toString()}`);
}