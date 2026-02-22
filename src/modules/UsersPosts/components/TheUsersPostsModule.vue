<script setup lang="ts">
import {useAuthStore} from "@/stores/authStore.ts";
import {useNoticeStore} from "@/stores/noticeStore.ts";
import {computed, onMounted, ref} from "vue";
import type {IUserData} from "@/types/utils.ts";
import {MAP_MARKS_ENDPOINT} from "@/assets/js/endpoints.ts";
import {sendParametredRequest} from "@/assets/js/utility-requests.ts";
import type {AxiosResponse} from "axios";
import type {TPostData, TResourcePaginated} from "@/types/api.ts";
import PostCard from "@/components/PostCard.vue";
import MapMarkers from "@/components/MapMarkers.vue";
import type {YMapMarkerProps} from "@yandex/ymaps3-types";

const authStore = useAuthStore();
const noticeStore = useNoticeStore();

const isLoading = ref(true);

const user = authStore.getUser() as IUserData;
const posts = ref<TPostData[]>([]);

const markers = computed(() => posts.value.map(el => {
	return {coordinates: [el.coordinates.lng, el.coordinates.lat]} as YMapMarkerProps
}));

const getUsersPostsHandler = async () => {
	try {
		isLoading.value = true;

		const response: AxiosResponse<TResourcePaginated<TPostData[]>> = await sendParametredRequest(MAP_MARKS_ENDPOINT, {
			fields: ['id', 'name', 'description', 'created_at', 'coordinates'],
			current_lat: user.start_coordinates.lat,
			current_lng: user.start_coordinates.lng,
			radius: 100 * 1000,
		});

		posts.value = response.data.resource.data;

	} catch (err: any) {
		noticeStore.addErrorNotice(err.response?.data?.message ?? 'Ошибка получения постов, пожалуйста попробуйте позже');
	} finally {
		isLoading.value = false;
	}
}

onMounted(async () => {
	await getUsersPostsHandler();
})

</script>

<template>
<div class="users-posts-module">
	<h2 class="module-title">
		Лента
	</h2>
	<template v-if="isLoading">
		<h3>Загрузка...</h3>
	</template>
	<template v-else>
		<template v-if="posts.length">
			<MapMarkers :markers="markers" :center="[user.start_coordinates.lng!, user.start_coordinates.lat!]" />
			<div class="posts">
				<PostCard v-for="post in posts" :key="post.id" :post="post" :is-owner="true" />
			</div>
		</template>
		<template v-else>
			<h3>Постов не найдено</h3>
		</template>
	</template>
</div>
</template>

<style scoped>

</style>