<script setup lang="ts">
	import { GlobalStore } from '@/stores'
	import { storeToRefs } from 'pinia'
	import { ref } from 'vue'
	const globalStore = GlobalStore()
	const sizeList = ref([
		{ key: 'default', name: '默认值' },
		{ key: 'large', name: '大型' },
		{ key: 'small', name: '小型' }
	])
	const { storeSize } = storeToRefs(globalStore)

	const changeSize = (size: 'default' | 'small' | 'large') => {
		storeSize.value = size
	}
</script>

<template>
	<el-dropdown trigger="click" @command="changeSize">
		<span>
			<el-tooltip content="组件大小" placement="bottom-start">
				<i class="icon-style iconfont icon-contentright"></i>
			</el-tooltip>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item :command="item.key" v-for="item in sizeList" :key="item.key" :disabled="item.key === storeSize">{{
					item.name
				}}</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<style scoped lang="scss">
	@import '../index.scss';
</style>
