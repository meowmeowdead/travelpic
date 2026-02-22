<script setup lang="ts">
import ProfileForm from "@/modules/ProfileModule/components/ProfileForm.vue";
import ProfileMapMark from "@/modules/ProfileModule/components/ProfileMapMark.vue";
import ChangePasswordForm from "@/modules/ProfileModule/components/ChangePasswordForm.vue";
import LogoutButton from "@/components/LogoutButton.vue";
</script>

<template>
<div id="profile-module" class="profile-module">
	<ProfileMapMark />
	<ProfileForm />
	<ChangePasswordForm />
	<LogoutButton class="profile-logout-button btn">
		Выйти
	</LogoutButton>
</div>
</template>

<style scoped>

</style>