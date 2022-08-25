import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const configRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		component: Layout,
		redirect: '/welcome',
		meta: { title: 'Dashboard', icon: 'DataBoard', index: 1 },
		children: [
			{
				path: '/welcome',
				name: 'welcome',
				component: () => import('@/views/data/welcome.vue'),
				meta: { title: '欢迎页', icon: 'DataLine' }
			},
			{
				path: '/dashboard',
				name: 'dashboard',
				component: () => import('@/views/data/dashboard.vue'),
				meta: { title: 'Dashboard', icon: 'Odometer' }
			},
			{
				path: '/good',
				name: 'good',
				component: () => import('@/views/data/goods.vue'),
				meta: { title: '添加商品', icon: 'Plus' }
			}
		]
	}
]

export default configRoutes
