<script setup lang="ts">
import RoutesLine from "@/components/RoutesLine.vue";

const profileViewRoutes = [
	{name: 'Профиль', to: {name: 'profile'}},
	{name: 'Посты', to: {name: 'my-posts'}},
	{name: 'Добавить', to: {name: 'add-post'}},
];

</script>

<template>
<div class="page-view profile-view">
	<RoutesLine :routes="profileViewRoutes" />
	<RouterView />
</div>
</template>

<style scoped>

</style>