import { createPinia, defineStore } from 'pinia'
import { globalStoreType } from './types'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import piniaPersist from '@/config/piniaPersist'
import { outLogin, getInfo } from '@/api/modules/user'
const pinia = createPinia()

export const GlobalStore = defineStore({
	id: 'GlobalStor',
	state: (): globalStoreType => ({
		counter: 0,
		storeSize: 'large',
		token: '',
		nickName: '',
		loginUserName: ''
	}),
	getters: {
		doubleCount: state => state.counter * 2
	},
	actions: {
		// 退出登入
		async logOut() {
			await outLogin()
			this.eliminate()
		},
		async getNickname() {
			const { data } = await getInfo()
			this.nickName = data.nickName
			this.loginUserName = data.loginUserName
		},
		eliminate() {
			this.nickName = ''
			this.token = ''
			this.loginUserName = ''
		}
	},
	persist: piniaPersist('GlobalStore')
})

pinia.use(piniaPluginPersistedstate)

export default pinia
