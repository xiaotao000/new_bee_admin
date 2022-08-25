<script setup lang="ts">
	import { MenuStore } from '@/stores/modules/menu'
	import { storeToRefs } from 'pinia'
	const menuStore = MenuStore()
	const { isCollapse } = storeToRefs(menuStore)
</script>

<template>
	<el-tooltip :content="isCollapse ? '展开' : '折叠'">
		<el-icon class="expand" @click="menuStore.Stretch()">
			<!-- 动态组件 -->
			<component :is="isCollapse ? 'Expand' : 'Fold'"></component>
		</el-icon>
	</el-tooltip>
</template>

<style scoped lang="scss">
	@import '../index.scss';
</style>
