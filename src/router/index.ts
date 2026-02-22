import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from "@/stores/authStore.ts";
import MainPage from "@/views/MainPage.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "main",
			component: MainPage,
		},
		{
			path: '/profile',
			name: 'profile-view',
			component: () => import("@/views/ProfileView.vue"),
			children: [
				{
					path: "",
					name: "profile",
					component: () => import("@/modules/ProfileModule/components/TheProfileModule.vue"),
				},
				{
					path: "posts",
					name: "my-posts",
					component: () => import("@/modules/MyPosts/components/TheMyPostsModule.vue"),
				},
				{
					path: "add-post",
					name: "add-post",
					component: () => import("@/modules/AddPost/components/TheAddPostModule.vue"),
				},
			]
		},
		{
			path: '/sign',
			name: 'sign',
			component: () => import("@/views/SignView.vue"),
			meta: {customLayout: 'empty'},
			children: [
				{
					path: '',
					name: 'auth',
					component: () => import("@/modules/Sign/components/AuthForm.vue"),
				},
				{
					path: 'up',
					name: 'register',
					component: () => import("@/modules/Sign/components/RegisterForm.vue"),
				},
			]
		},
		{
			path: '/:pathMatch(.*)*',
			component: () => import('@/views/NotFoundView.vue'),
		},
	],
})

router.beforeEach((to) => {
	const authStore = useAuthStore();
	authStore.checkLogged();
	
	if(!authStore.isLogged) {
		if (!to.path.includes('sign')) {
			return '/sign';
		}
	}else {
		if (to.path.includes('sign')) {
			return '/';
		}
	}
});

export default router
