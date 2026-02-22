import {ref, type Ref} from 'vue'
import {defineStore} from 'pinia'
import type {ITokenData, IUserData} from "@/types/utils.ts";

export const useAuthStore = defineStore('auth', () => {
	
	const isLogged: Ref<boolean> = ref(false);
	
	const getUser = (): IUserData | null => {
		const user = localStorage.getItem('userData');
		if(!user) {
			return null;
		}
		return JSON.parse(user);
	}
	
	const getTokenData = (): ITokenData | null => {
		const tokenData = localStorage.getItem('tokenData');
		if(!tokenData) {
			return null;
		}
		return JSON.parse(tokenData);
	}
	
	const getToken = (): ITokenData['access_token'] | null => {
		const tokenData = getTokenData();
		if(!tokenData) {
			return null;
		}
		return tokenData['access_token'];
	}
	
	const removeToken = () => {
		return localStorage.removeItem('tokenData');
	}
	
	const removeUser = () => {
		return localStorage.removeItem('userData');
	}
	
	const setUserdata = (user: IUserData) => {
		return localStorage.setItem('userData', JSON.stringify(user));
	}
	const setTokenData = (tokenData: ITokenData) => {
		const timestamp = new Date().getTime();
		const data = {
			access_token: `${tokenData.token_type} ${tokenData.access_token}`,
			expires_in: timestamp + (tokenData.expires_in * 1000),
			refresh_ttl: timestamp + (tokenData.refresh_ttl * 1000),
		};
		
		return localStorage.setItem('tokenData', JSON.stringify(data));
	}
	
	const loginUser = (user: IUserData, token: ITokenData) => {
		setUserdata(user);
		setTokenData(token);
		isLogged.value = true;
	}
	
	const logoutUser = () => {
		removeToken();
		removeUser();
		isLogged.value = false;
	}
	
	const checkLogged = () => {
		if(getUser() && getTokenData()) {
			if(!isLogged.value) {
				isLogged.value = true;
			}
			return true;
		}
		logoutUser();
		isLogged.value = false;
		return false;
	}
	
	const isTokenExpired = (): boolean => {
		const tokenData = getTokenData();
		if(!tokenData) {
			return true;
		}
		return new Date().getTime() > tokenData.expires_in;
	}
	
	
	return {
		getUser,
		getTokenData,
		getToken,
		setTokenData,
		setUserdata,
		loginUser,
		logoutUser,
		checkLogged,
		isTokenExpired,
		isLogged
	}
})