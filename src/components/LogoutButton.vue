<script setup lang="ts">
import LogoutIcon from "@/ui/icons/LogoutIcon.vue";
import {ref} from "vue";
import {API} from "@/assets/js/API.ts";
import {LOGOUT_ENDPOINT} from "@/assets/js/endpoints.ts";
import {useAuthStore} from "@/stores/authStore.ts";
import {useRouter} from "vue-router";

const isLoading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const logoutHandler = async () => {
	isLoading.value = true;
	try {
		await API.get(LOGOUT_ENDPOINT);
		authStore.logoutUser();

		await router.push({name: 'auth'});

	} catch (err: any) {

	} finally {
		isLoading.value = false;
	}
}

</script>

<template>
<button class="logout-button" type="button" @click="logoutHandler" :disabled="isLoading">
	<slot>
		<LogoutIcon />
	</slot>
</button>
</template>

<style scoped>

</style>