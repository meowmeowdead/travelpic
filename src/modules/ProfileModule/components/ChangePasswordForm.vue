<script setup lang="ts">
import {ref} from "vue";
import {useNoticeStore} from "@/stores/noticeStore.ts";
import * as yup from "yup";
import {ErrorMessage, Field, Form, type FormActions, type GenericObject} from "vee-validate";
import {API} from "@/assets/js/API.ts";
import {CHANGE_PASSWORD_ENDPOINT} from "@/assets/js/endpoints.ts";
import type {TFormError} from "@/types/api.ts";

const isLoading = ref(false);

const noticeStore = useNoticeStore();

const schema = yup.object({
	current_password: yup.string().required('Пароль обязателен').min(6, 'Пароль должен иметь не менее 6 символов'),
	new_password: yup.string().required('Новый пароль обязателен').min(6, 'Пароль должен иметь не менее 6 символов'),
	new_password_confirmation: yup.string().required('Повторите пароль').oneOf([yup.ref('new_password')], 'Пароли не совпдаают'),
});

type TValuesType = GenericObject | yup.InferType<typeof schema>;

const tryChangePassword = async (values: TValuesType, {setFieldError, resetForm}: FormActions<TValuesType>) => {
	try {
		isLoading.value = true;
		await API.patch(CHANGE_PASSWORD_ENDPOINT, values);

		noticeStore.addNotice('Пароль успешно обновлён');
		resetForm();
	} catch (err: any) {
		noticeStore.addErrorNotice(err.response?.data?.message ?? 'Ошибка смены пароля, попробуйте позже');
		if(err.response.data.errors && typeof err.response.data.errors === 'object') {
			for (const [key, error] of Object.entries(err.response.data.errors as TFormError)) {
				setFieldError(key as string, error);
			}
		}
	} finally {
		isLoading.value = false;
	}
}

</script>

<template>
	<Form class="change-password-form form-wrapper"
	      :validation-schema="schema"
	      @submit="tryChangePassword"
	      :disabled="isLoading"
	      v-slot="{ setFieldError, meta, resetForm }"
	>
		<h3>Смена пароля</h3>
		<div class="form-input">
			<Field name="current_password" type="password" placeholder="Пароль" />
			<ErrorMessage name="current_password" />
		</div>
		<div class="form-input">
			<Field name="new_password" type="password" placeholder="Пароль" />
			<ErrorMessage name="new_password" />
		</div>
		<div class="form-input">
			<Field name="new_password_confirmation" type="password" placeholder="Повторите пароль" />
			<ErrorMessage name="new_password_confirmation" />
		</div>
		<button class="btn" :disabled="!meta.valid">
			Сменить пароль
		</button>
	</Form>
</template>

<style scoped>

</style>