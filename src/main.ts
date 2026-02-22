import "@/assets/css/main.css";
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import {createYmaps} from "vue-yandex-maps";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createYmaps({
	apikey: import.meta.env.VITE_YMAP_API_KEY,
}));

app.mount('#app')
