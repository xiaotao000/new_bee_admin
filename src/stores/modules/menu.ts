import { defineStore } from 'pinia'
import piniaPersist from '@/config/piniaPersist'

export const MenuStore = defineStore({
	id: 'MenuStore',
	state: () => ({
		isCollapse: false
	}),
	getters: {},
	actions: {
		Stretch() {
			this.isCollapse = !this.isCollapse
		}
	},
	persist: piniaPersist('MenuStore')
})
