<script setup lang="ts">
import {computed, ref, watch} from "vue";
import {API} from "@/assets/js/API.ts";
import {MAP_MARKS_ENDPOINT} from "@/assets/js/endpoints.ts";
import {useNoticeStore} from "@/stores/noticeStore.ts";
import type {YMapMarkerProps} from "@yandex/ymaps3-types";
import MapMarkSetter from "@/components/MapMarkSetter.vue";

type TAddFormData = {
	name: string,
	description: string,
	lat: number | null,
	lng: number | null,
}

const noticeStore = useNoticeStore();

const isLoading = ref(false);

const formData = ref<TAddFormData>({
	name: "",
	description: "",
	lat: null,
	lng: null,
});

const marker = ref<YMapMarkerProps | null>(null);

const isCanAdd = computed(() => formData.value.name.trim().length && formData.value.lat && formData.value.lng);


watch(marker, () => {
	formData.value.lng = marker.value?.coordinates[0] ?? null;
	formData.value.lat = marker.value?.coordinates[1] ?? null;
});

const addPostHandler = async () => {
	try {
		isLoading.value = true;

		await API.post(MAP_MARKS_ENDPOINT, formData.value);

		formData.value.name = "";
		formData.value.description = "";
		formData.value.lat = null;
		formData.value.lng = null;

		marker.value = null;

		noticeStore.addNotice('Пост успешно добавлен');
	} catch (err: any) {
		noticeStore.addErrorNotice(err.response?.data?.message ?? 'Ошибка добавления поста, пожалуйста попробуйте позже');
	} finally {
		isLoading.value = false;
	}
}


</script>

<template>
<div class="add-post-module">
	<form class="add-post-form form-wrapper"
	      :disabled="isLoading"
	      @submit.prevent="addPostHandler"
	>
		<h3>Добавить пост</h3>
		<div class="form-input">
			<div class="input-title">
				Заголовок
			</div>
			<input type="text" name="name" v-model="formData.name" required>
		</div>
		<div class="form-input">
			<div class="input-title">
				Описание
			</div>
			<textarea name="description" v-model="formData.description"></textarea>
		</div>
		<div class="form-input">
			<div class="input-title">
				Местоположение
			</div>
			<MapMarkSetter v-model="marker" />
		</div>
		<button class="btn" :disabled="!isCanAdd">
			Добавить
		</button>
	</form>
</div>
</template>

<style scoped>

</style>