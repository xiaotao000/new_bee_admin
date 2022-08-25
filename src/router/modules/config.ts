import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const configRoutes: RouteRecordRaw[] = [
	{
		path: '/config',
		name: 'config',
		component: Layout,
		redirect: '/config/swiper',
		meta: { title: '首页配置', icon: 'House', index: 2 },
		children: [
			{
				path: '/config/swiper',
				name: 'swiper',
				component: () => import('@/views/config/swiper/index.vue'),
				meta: { title: '轮播图配置', icon: 'PictureFilled' }
			},
			{
				path: '/config/hot',
				name: 'hot',
				component: () => import('@/views/config/hot/index.vue'),
				meta: { title: '热销产品配置', icon: 'StarFilled' }
			},
			{
				path: '/config/new',
				name: 'new',
				component: () => import('@/views/config/new/index.vue'),
				meta: { title: '新品上线', icon: 'Sell' }
			},
			{
				path: '/config/recommend',
				name: 'recommend',
				component: () => import('@/views/config/recommend/index.vue'),
				meta: { title: '为你推荐配置', icon: 'Pointer' }
			}
		]
	}
]

export default configRoutes
