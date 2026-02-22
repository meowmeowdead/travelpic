export const API_BASE_URL: string = "https://travelpicapi.tw1.ru/api/v1";

export const AUTH_ENDPOINT: string = '/auth';
export const LOGIN_ENDPOINT: string = `${AUTH_ENDPOINT}/login`;
export const REGISTER_ENDPOINT: string = `${AUTH_ENDPOINT}/register`;
export const LOGOUT_ENDPOINT: string = `${AUTH_ENDPOINT}/logout`;
export const ME_ENDPOINT: string = `${AUTH_ENDPOINT}/me`;

export const REFRESH_TOKEN_ENDPOINT: string = `${AUTH_ENDPOINT}/refresh`;

export const USER_ENDPOINT: string = '/user';
export const UPDATE_USER_ENDPOINT: string = `${USER_ENDPOINT}/update`;
export const CHANGE_PASSWORD_ENDPOINT: string = `${USER_ENDPOINT}/change-password`;

export const MAP_MARKS_ENDPOINT: string = '/map-marks';