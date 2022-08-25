import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const configRoutes: RouteRecordRaw[] = [
	{
		path: '/module',
		component: Layout,
		redirect: '/module/category',
		meta: { title: '模块管理', icon: 'Tools' },
		children: [
			{
				path: '/module/category',
				name: 'category',
				component: () => import('@/views/modules/category/index.vue'),
				meta: { title: '分类管理', icon: 'Menu', index: 3 }
			},
			{
				path: '/module/goods',
				name: 'goods',
				component: () => import('@/views/modules/goods/index.vue'),
				meta: { title: '商品管理', icon: 'GoodsFilled' }
			},
			{
				path: '/module/guest',
				name: 'guest',
				component: () => import('@/views/modules/guest/index.vue'),
				meta: { title: '会员管理', icon: 'UserFilled' }
			},
			{
				path: '/module/order',
				name: 'order',
				component: () => import('@/views/modules/order/index.vue'),
				meta: { title: '订单管理', icon: 'List' }
			},
			{
				path: '/module/order_detail/:id',
				name: 'order_detail',
				component: () => import('@/views/modules/order/order_detail.vue')
			}
		]
	}
]

export default configRoutes
