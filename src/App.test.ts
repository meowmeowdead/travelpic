import {enableAutoUnmount, mount} from "@vue/test-utils";
import {afterEach, describe, expect, test, vi} from "vitest";
import {createTestingPinia} from "@pinia/testing";
import router from "@/router";
import App from "@/App.vue";

enableAutoUnmount(afterEach);

describe('Application', async () => {
	
	test('Unauthorized access is locked', async () => {
		const wrapper = mount(App, {
			global: {
				plugins: [createTestingPinia({
					createSpy: vi.fn,
					stubActions: false,
				}), router],
			},
		});
		
		await router.push('/');
		
		expect(wrapper.find('.auth-component').exists()).toBe(true);
	});
	
	
	test('Authorized view works correct', async () => {
		localStorage.setItem('userData', JSON.stringify({name: 'testovich'}));
		localStorage.setItem('tokenData', JSON.stringify({
			access_token: "1",
			expires_in: 1,
			refresh_ttl: 1
		}));
		
		
		const wrapper = mount(App, {
			global: {
				plugins: [createTestingPinia({
					createSpy: vi.fn,
					stubActions: false,
				}), router],
			},
		});
		
		await router.push('/');
		
		expect(wrapper.find('.main-page-view').exists()).toBe(true);
	});
	
	
	
});