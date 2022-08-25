import router from './router'
import { GlobalStore } from '@/stores'
router.beforeEach(async to => {
	const store = GlobalStore()
	if (store.token) {
		if (to.path === '/login') return { path: '/' }
		if (store.nickName) return
		try {
			return await store.getNickname()
		} catch (error) {
			store.eliminate()
			return { name: 'login' }
		}
	}
	if (to.path === '/login') return
	return { name: 'login' }
})

// router.afterEach(() => {})

export default router
