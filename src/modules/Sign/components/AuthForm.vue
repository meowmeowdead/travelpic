<script setup lang="ts">
import {ref} from "vue";
import {useNoticeStore} from "@/stores/noticeStore.ts";
import {useAuthStore} from "@/stores/authStore.ts";
import {useRouter} from "vue-router";
import * as yup from 'yup';
import {Field, ErrorMessage, Form, type GenericObject, type FormActions} from "vee-validate";
import {API_BASE_URL, LOGIN_ENDPOINT} from "@/assets/js/endpoints.ts";
import PasswordInput from "@/ui/inputs/PasswordInput.vue";
import axios, {type AxiosResponse} from "axios";
import type {TResource} from "@/types/api.ts";
import type {ITokenData, IUserData} from "@/types/utils.ts";
import {getMe} from "@/assets/js/utility-requests.ts";

const isLoading = ref(false);

const noticeStore = useNoticeStore();
const authStore = useAuthStore();
const router = useRouter();

const schema = yup.object({
	email: yup.string().required('Email обязателен').email('Введите корректный email'),
	password: yup.string().required('Пароль обязателен').min(6, 'Пароль должен иметь не менее 6 символов'),
});

type TValuesType = GenericObject | yup.InferType<typeof schema>;

const tryAuth = async (values: TValuesType, {setFieldError}: FormActions<TValuesType>) => {
	isLoading.value = true;
	try {
		const response: AxiosResponse<TResource<ITokenData>> = await axios.post(`${API_BASE_URL}${LOGIN_ENDPOINT}`, values);

		authStore.setTokenData(response.data.resource);

		const userData: AxiosResponse<TResource<IUserData>> = await getMe();
		authStore.loginUser(userData.data.resource, response.data.resource);

		await router.push('/');
	} catch (err: any) {
		noticeStore.addErrorNotice(err.response?.data?.message ?? 'Ошибка авторизации, попробуйте позже');
		if(err.response.data.errors) {
			setFieldError('email', err.response.data.errors.email);
		}
		if(err.response.data.password) {
			setFieldError('password', err.response.data.errors.password);
		}
	} finally {
		isLoading.value = false;
	}
}


</script>

<template>
<div class="auth-component sign-component">
	<h2 class="sign-component__title">
		Авторизация
	</h2>
	<Form class="auth-form sign-form"
	      v-slot="{setFieldError}"
	      :validation-schema="schema"
	      @submit="tryAuth"
	      :disabled="isLoading"
	>
		<div class="form-input">
			<Field name="email" type="email" placeholder="Email" />
			<ErrorMessage name="email" />
		</div>
		<div class="form-input password-input">
			<PasswordInput />
		</div>
		<button class="btn">
			Войти
		</button>
	</Form>
	<p class="annotation">
		Нет аккаунта? <router-link :to="{name: 'register'}">Зарегистрироваться</router-link>
	</p>
</div>
</template>

<style scoped>

</style>