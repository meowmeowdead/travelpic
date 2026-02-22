<script setup lang="ts">
import {ErrorMessage, Field} from "vee-validate";
import {computed, ref} from "vue";
import EyeIcon from "@/ui/icons/EyeIcon.vue";
import ClosedEyeIcon from "@/ui/icons/ClosedEyeIcon.vue";

const {name = 'password', placeholder = 'Пароль'} = defineProps<{
	name?: string,
	placeholder?: string,
}>();

const isShowPassword = ref(false);
const inputType = computed(() => isShowPassword.value ? 'text' : 'password');

</script>

<template>
<div class="form-input password-input">
	<span class="input-holder">
		<Field :name="name" :type="inputType" :placeholder="placeholder" />
		<button type="button" class="toggle-password" @click="isShowPassword = !isShowPassword">
			<EyeIcon v-if="isShowPassword" />
			<ClosedEyeIcon v-else />
		</button>
	</span>
	<ErrorMessage name="password" />
</div>
</template>

<style scoped>

</style>