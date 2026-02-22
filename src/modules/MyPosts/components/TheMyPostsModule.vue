<script setup lang="ts">
import {useAuthStore} from "@/stores/authStore.ts";
import {useNoticeStore} from "@/stores/noticeStore.ts";
import {onMounted, ref} from "vue";
import type {IUserData} from "@/types/utils.ts";
import {MAP_MARKS_ENDPOINT} from "@/assets/js/endpoints.ts";
import {sendParametredRequest} from "@/assets/js/utility-requests.ts";
import type {AxiosResponse} from "axios";
import type {TPostData, TResourcePaginated} from "@/types/api.ts";
import PostCard from "@/components/PostCard.vue";

const authStore = useAuthStore();
const noticeStore = useNoticeStore();

const isLoading = ref(true);

const user = authStore.getUser() as IUserData;
const posts = ref<TPostData[]>([]);

const getMyPostsHandler = async () => {
	try {
		isLoading.value = true;

		const response: AxiosResponse<TResourcePaginated<TPostData[]>> = await sendParametredRequest(MAP_MARKS_ENDPOINT, {
			user_ids: user.id,
			fields: ['id', 'name', 'description', 'created_at', 'coordinates'],
		});

		posts.value = response.data.resource.data;

	} catch (err: any) {
		noticeStore.addErrorNotice(err.response?.data?.message ?? 'Ошибка получения постов, пожалуйста попробуйте позже');
	} finally {
		isLoading.value = false;
	}
}

onMounted(async () => {
	await getMyPostsHandler();
})

</script>

<template>
<div class="my-posts-module">
	<template v-if="isLoading">
		<h3>Загрузка...</h3>
	</template>
	<template v-else>
		<template v-if="posts.length">
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