<script setup lang="ts">
import PinHouseIcon from "@/ui/icons/PinHouseIcon.vue";
import SettingsIcon from "@/ui/icons/SettingsIcon.vue";
import BorderedPlusIcon from "@/ui/icons/BorderedPlusIcon.vue";
import FeedIcon from "@/ui/icons/FeedIcon.vue";
</script>

<template>
<div class="mobile-bottom-bar">
	<router-link class="mobile-bottom-bar__link" :to="{name: 'main'}">
		<PinHouseIcon />
	</router-link>
	<router-link class="mobile-bottom-bar__link" :to="{name: 'add-post'}">
		<BorderedPlusIcon />
	</router-link>
	<router-link class="mobile-bottom-bar__link" :to="{name: 'my-posts'}">
		<FeedIcon />
	</router-link>
	<router-link class="mobile-bottom-bar__link" :to="{name: 'profile'}">
		<SettingsIcon />
	</router-link>
</div>
</template>

<style scoped>

</style>