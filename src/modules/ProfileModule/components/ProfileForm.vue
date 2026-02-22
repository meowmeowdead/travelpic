<script setup lang="ts">
import {ref} from "vue";
import {useNoticeStore} from "@/stores/noticeStore.ts";
import {useAuthStore} from "@/stores/authStore.ts";
import {API} from "@/assets/js/API.ts";
import {UPDATE_USER_ENDPOINT} from "@/assets/js/endpoints.ts";
import type {AxiosResponse} from "axios";
import type {TResource} from "@/types/api.ts";
import type {IUserData} from "@/types/utils.ts";

const authStore = useAuthStore();
const user = authStore.getUser();
const noticeStore = useNoticeStore();

const isLoading = ref(false);

const formData = ref({
	name: user?.name ?? "",
	lastname: user?.lastname ?? "",
});

const updateUserHandler = async () => {
	try {
		isLoading.value = true;

		const response: AxiosResponse<TResource<IUserData>> = await API.patch(UPDATE_USER_ENDPOINT, formData.value);
		authStore.setUserdata(response.data.resource);

		noticeStore.addNotice('Данные успешно обновлёны');
	} catch (err: any) {
		noticeStore.addErrorNotice(err.response?.data?.message ?? 'Ошибка обновления пользователя, пожалуйста попробуйте позже');
	} finally {
		isLoading.value = false;
	}
}
</script>

<template>
	<form class="profile-form form-wrapper"
	      @submit.prevent="updateUserHandler"
	      :disabled="isLoading"
	>
		<h3>Данные</h3>
		<div class="form-input">
			<div class="input-title">
				Имя
			</div>
			<input type="text" name="name" v-model="formData.name">
		</div>
		<div class="form-input">
			<div class="input-title">
				Фамилия
			</div>
			<input type="text" name="lastname" v-model="formData.lastname">
		</div>
		<button class="btn update">
			Обновить
		</button>
	</form>
</template>

<style scoped>

</style>