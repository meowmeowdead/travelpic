<script setup lang="ts">
import type {YMapMarkerProps} from '@yandex/ymaps3-types';
import {ref} from "vue";
import type {AxiosResponse} from "axios";
import type {TResource} from "@/types/api.ts";
import type {IUserData} from "@/types/utils.ts";
import {API} from "@/assets/js/API.ts";
import {UPDATE_USER_ENDPOINT} from "@/assets/js/endpoints.ts";
import {useAuthStore} from "@/stores/authStore.ts";
import {useNoticeStore} from "@/stores/noticeStore.ts";
import MapMarkSetter from "@/components/MapMarkSetter.vue";


const authStore = useAuthStore();
const user = authStore.getUser() as IUserData;
const noticeStore = useNoticeStore();

const isLoading = ref(false);

const marker = ref<YMapMarkerProps | null>(null);

if(user.start_coordinates.lat && user.start_coordinates.lng) {
	marker.value = {
		coordinates: [user?.start_coordinates.lng, user?.start_coordinates.lat],
	};
}

const updateUserCoordsHandler = async () => {
	try {
		isLoading.value = true;
		const response: AxiosResponse<TResource<IUserData>> = await API.patch(UPDATE_USER_ENDPOINT, {
			start_coordinate_lat: marker.value?.coordinates[1],
			start_coordinate_lng: marker.value?.coordinates[0]
		});
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
<div class="profile-map-mark form-wrapper">
	<h3>Ваша метка</h3>
	<p>Посты в ленте будут показываться на основе вашей позиции</p>
	<MapMarkSetter v-model="marker" />
	<button class="btn" :disabled="!marker || isLoading" @click="updateUserCoordsHandler">
		Обновить
	</button>
</div>
</template>

<style scoped>

</style>