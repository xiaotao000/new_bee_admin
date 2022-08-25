import { RouteRecordRaw } from 'vue-router'
const ModuleArray = import.meta.glob('./modules/*.ts', { eager: true })

export const routerArray: RouteRecordRaw[] = []

Object.keys(ModuleArray).forEach(item => {
	Object.keys(ModuleArray[item]).forEach((key: any) => {
		routerArray.push(...ModuleArray[item][key])
	})
})
routerArray.sort((a, b) => a.meta.index - b.meta.index)
function deepFilter(arr: any, callBack: Function) {
	const nr = []
	for (let i = 0; i < arr.length; i++) {
		const e = { ...arr[i] }
		if (e.children) {
			e.children = deepFilter(e.children, callBack)
		}
		if (callBack(e, i, arr)) {
			nr.push(e)
		}
	}
	return nr
}
export const menuRoutes = deepFilter(routerArray, e => e.meta?.title)

const routes: RouteRecordRaw[] = [
	// 登入
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue')
	},
	...routerArray
]

export default routes
