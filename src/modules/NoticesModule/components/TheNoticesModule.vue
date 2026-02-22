<script setup lang="ts">
import {useNoticeStore} from "@/stores/noticeStore.js";
import Notice from "@/modules/NoticesModule/components/Notice.vue";
import type {INotice} from "@/types/utils.ts";
const noticeStore = useNoticeStore();

</script>

<template>
	<div id="notices-module" class="notices-module">
		<TransitionGroup name="list" tag="ul">
			<Notice v-for="notice in noticeStore.notices"
			        :key="notice.id"
			        :notice="notice"
			        @remove-notice="(noticeId: INotice['id']) => noticeStore.removeNotice(noticeId)"
			/>
		</TransitionGroup>
	</div>
</template>

<style scoped>

</style>