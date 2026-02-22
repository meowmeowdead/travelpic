<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import MobileBottomBar from "@/components/MobileBottomBar.vue";
import {isMobileScreen} from "@/assets/js/checkers.ts";
</script>

<template>
<div id="main-app" class="main-app-layout app-layout">
	<TheHeader />
	<div class="content-box">
		<router-view />
	</div>
	<MobileBottomBar v-if="isMobileScreen()" />
</div>
</template>

<style scoped>

</style>