/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly VITE_YMAP_API_KEY: string
	// Добавьте другие переменные здесь
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}