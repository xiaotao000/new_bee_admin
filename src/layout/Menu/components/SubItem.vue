<script setup lang="ts">
	import { RouteRecordRaw } from 'vue-router'

	defineProps<{ item: RouteRecordRaw }>()
</script>

<template>
	<el-sub-menu v-if="item.children" :index="item.path">
		<template #title>
			<el-icon><component :is="item.meta.icon" /></el-icon>
			<span>{{ item.meta.title }}</span>
		</template>
		<SubItem v-for="route in item.children" :key="route.path" :item="route" />
	</el-sub-menu>

	<el-menu-item v-else :index="item.path">
		<template #title>
			<el-icon><component :is="item.meta.icon" /></el-icon>
			<span> {{ item.meta.title }} </span>
		</template>
	</el-menu-item>
</template>

<style scoped lang="scss">
	@import '../index.scss';
</style>
