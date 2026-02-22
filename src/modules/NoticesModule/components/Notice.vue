<script setup lang="ts">
import type {INotice} from "@/types/utils.ts";

const { notice } = defineProps<{
	notice: INotice
}>();
</script>

<template>
	<div class="notice" :class="notice.type">
		<div class="notice__message">
			{{ notice.message }}
		</div>
		<div class="notice__close" @click="$emit('removeNotice', notice.id)">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 16.1359L3.86406 17.5L10 11.3641L16.1359 17.5L17.5 16.1359L11.3641 10L17.5 3.86406L16.1359 2.5L10 8.63594L3.86406 2.5L2.5 3.86406L8.63594 10L2.5 16.1359Z" fill="#2F3747" />
			</svg>
		</div>
	</div>
</template>

<style scoped>

</style>