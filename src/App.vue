<script setup lang="ts">
import {useAuthStore} from "@/stores/authStore.ts";
import {shallowRef, watch} from "vue";
import {useRoute} from "vue-router";
import TheNoticesModule from "@/modules/NoticesModule/components/TheNoticesModule.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import MainApp from "@/layouts/MainApp.vue";


const currentLayout = shallowRef(EmptyLayout);

const authStore = useAuthStore();
authStore.checkLogged();

const route = useRoute();

watch(() => route.meta, (meta) => {
	if(!meta.customLayout) {
		currentLayout.value = MainApp;
		return;
	}
	switch (meta.customLayout) {
		case 'empty':
			currentLayout.value = EmptyLayout;
			return;
		default:
			currentLayout.value = MainApp;
	}
});


</script>

<template>
	<component :is="currentLayout" />
	<TheNoticesModule />
</template>

<style scoped></style>
