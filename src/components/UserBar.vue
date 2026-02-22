<script setup lang="ts">
import {useAuthStore} from "@/stores/authStore.ts";
import PersonIcon from "@/ui/icons/PersonIcon.vue";

const authStore = useAuthStore()
const userData = authStore.getUser();

</script>

<template>
<div class="user-bar">
	<div class="user-bar__icon">
		<PersonIcon />
	</div>
	<router-link :to="{name: 'profile'}" class="user-bar__email">
		{{userData?.email ?? 'User'}}
	</router-link>
</div>
</template>

<style scoped>

</style>