<script setup lang="ts">
import {ref} from "vue";
import {useNoticeStore} from "@/stores/noticeStore.ts";
import {useRouter} from "vue-router";
import * as yup from "yup";
import {ErrorMessage, Field, Form, type GenericObject, type FormActions} from "vee-validate";
import {API_BASE_URL, REGISTER_ENDPOINT} from "@/assets/js/endpoints.ts";
import axios from "axios";

const router = useRouter();

const isLoading = ref(false);

const noticeStore = useNoticeStore();


const schema = yup.object({
	email: yup.string().required('Email обязателен').email('Введите корректный email'),
	password: yup.string().required('Пароль обязателен').min(6, 'Пароль должен иметь не менее 6 символов'),
	password_confirmation: yup.string().required('Пароль обязателен').oneOf([yup.ref('password')], 'Пароли не совпдаают'),
	name: yup.string(),
	lastname: yup.string()
});

type TValuesType = GenericObject | yup.InferType<typeof schema>;

const tryRegister = async (values: TValuesType, {setFieldError}: FormActions<TValuesType>) => {
	isLoading.value = true;

	try {
		await axios.post(`${API_BASE_URL}${REGISTER_ENDPOINT}`, {
			...values,
			start_coordinate_lat: 55.7373251097411,
			start_coordinate_lng: 37.5643860578003
		});
		noticeStore.addNotice('Регистрация успешна');

		await router.push({name: 'auth'});

	} catch (err: any) {
		noticeStore.addErrorNotice(err.response?.data?.message ?? 'Ошибка регистрации, попробуйте позже');
		if(err.response.data.errors) {
			setFieldError('email', err.response.data.errors.email);
		}
	} finally {
		isLoading.value = false;
	}
}

</script>

<template>
<div class="register-form sign-component">
	<h2 class="sign-component__title">
		Регистрация
	</h2>
	<Form class="register-form sign-form"
	      :validation-schema="schema"
	      @submit="tryRegister"
	      :disabled="isLoading"
	      v-slot="{ setFieldError }"
	>
		<div class="form-input">
			<Field name="email" type="email" placeholder="Email" />
			<ErrorMessage name="email" />
		</div>
		<div class="form-input">
			<Field name="password" type="password" placeholder="Пароль" />
			<ErrorMessage name="password" />
		</div>
		<div class="form-input">
			<Field name="password_confirmation" type="password" placeholder="Повторите пароль" />
			<ErrorMessage name="password_confirmation" />
		</div>
		<div class="form-input">
			<Field name="name" type="text" placeholder="Имя" />
			<ErrorMessage name="name" />
		</div>
		<div class="form-input">
			<Field name="lastname" type="text" placeholder="Фамилия" />
			<ErrorMessage name="lastname" />
		</div>
		<button class="btn">
			Зарегистрироваться
		</button>
	</Form>
	<p class="annotation">
		Уже зарегистрированы? <router-link :to="{name: 'auth'}">Войти</router-link>
	</p>
</div>
</template>

<style scoped>

</style>