import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const configRoutes: RouteRecordRaw[] = [
	{
		path: '/system',
		component: Layout,
		redirect: '/system/adminInfo',
		meta: { title: '系统管理', icon: 'Setting', index: 4 },
		children: [
			{
				path: '/system/adminInfo',
				name: 'adminInfo',
				component: () => import('@/views/system/adminInfo.vue'),
				meta: { title: '信息修改', icon: 'Lock' }
			}
		]
	}
]

export default configRoutes
