<script setup lang="ts">
import AppLogo from "@/components/AppLogo.vue";
</script>

<template>
	<header class="sign-module-header">
		<AppLogo />
		<slot name="action"></slot>
	</header>
</template>

<style scoped>

</style>