import { createRouter, createWebHistory } from 'vue-router'
import { routerArray } from './routes'

const router = createRouter({
	// history 配置路由模式 createWebHistory【history模式】  createWebHashHistory【hash模式】
	history: createWebHistory(),
	routes: [
		// 登入
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/login/index.vue')
		},
		{
			path: '/404',
			name: '404',
			component: () => import('@/views/error/404.vue')
		},
		...routerArray,
		{ path: '/:pathMatch(.*)*', redirect: '/404' }
	]
})

export default router
