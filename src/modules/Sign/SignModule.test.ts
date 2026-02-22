import {describe, expect, test, afterEach, vi} from 'vitest'
import {enableAutoUnmount, mount} from '@vue/test-utils'
import router from "@/router";
import TheSignModule from "@/modules/Sign/components/TheSignModule.vue";
import {createTestingPinia} from "@pinia/testing";

enableAutoUnmount(afterEach);

describe('SignModule', async () => {
	const wrapper = mount(TheSignModule, {
		global: {
			plugins: [createTestingPinia({
				createSpy: vi.fn,
				stubActions: false,
			}), router],
		},
	});
	
	await router.push('/sign');
	
	test('mounts renders properly', async () => {
		expect(wrapper.find('.auth-component').exists()).toBe(true);
	});
	
	test('moving to sign-up', async () => {
		await wrapper.find('a[href="/sign/up"]').trigger('click');
		expect(wrapper.find('.sign-component').exists()).toBe(true);
	});
})