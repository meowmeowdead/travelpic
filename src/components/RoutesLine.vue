<script setup lang="ts">
import type {IRouteLine} from "@/types/utils.ts";

const props = defineProps<{
	routes: IRouteLine[]
}>()
</script>

<template>
<div class="routes-line">
	<router-link :to="route.to" v-for="(route, idx) in props.routes" :key="idx" class="route-line">
		{{route.name}}
	</router-link>
</div>
</template>

<style scoped>

</style>