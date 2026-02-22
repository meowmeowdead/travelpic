import axios, {type AxiosError, type AxiosResponse} from "axios";
import {useAuthStore} from "@/stores/authStore.ts";
import {API_BASE_URL} from "@/assets/js/endpoints.ts";
import router from "@/router";
import {refreshToken} from "@/assets/js/utility-requests.ts";
import type {TResource} from "@/types/api.ts";
import type {ITokenData} from "@/types/utils.ts";

const API = axios.create({
	baseURL: API_BASE_URL
});

API.interceptors.request.use(function (config) {
	const authStore = useAuthStore();
	config.headers.Authorization = authStore.getToken();
	
	return config;
}, function (error: AxiosError<any>) {
	return Promise.reject(error);
});

// Add a response interceptor
API.interceptors.response.use((response) => {
	return response;
}, async (error: AxiosError<any>) => {
	if(error.status === 401) {
		const authStore = useAuthStore();
		try {
			const response: AxiosResponse<TResource<ITokenData>> = await refreshToken();
			authStore.setTokenData(response.data.resource);
			if(error.config) {
				return await API.request(error.config);
			}
		} catch (err) {
			authStore.logoutUser();
			await router.push({name: 'auth'});
		}
	}
	return Promise.reject(error);
});

export {API};