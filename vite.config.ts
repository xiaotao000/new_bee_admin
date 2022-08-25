import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		open: true,
		proxy: {
			'/api': {
				target: 'http://zhi.zeng.pub/new-bee/manage-api/v1/',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, '')
			}
		}
	},
	// 插件
	plugins: [vue(), VueSetupExtend()],
	// 解析
	resolve: {
		// 路径别名
		alias: {
			// 快速进入src目录
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			// 快速进入根目录
			'~': fileURLToPath(new URL('./', import.meta.url))
		}
	}
})
