<script setup lang="ts">
import type {TPostData} from "@/types/api.ts";
import {formatDate} from "@/assets/js/formatters.ts";

const {post, isOwner = false} = defineProps<{
	post: Partial<TPostData>,
	isOwner: boolean,
}>();

const formattedDate = formatDate(post.created_at ?? "");

</script>

<template>
<div class="post-card">
	<div class="post-card__image-holder"></div>
	<h4 class="post-card__title">
		{{post.name}}
	</h4>
	<div class="post-card__desc" v-if="post.description">
		{{post.description}}
	</div>
	<div class="post-card__date">
		{{formattedDate.date}}
	</div>
</div>
</template>

<style scoped>

</style>