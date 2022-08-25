<script setup lang="ts">
	import { ArrowRight } from '@element-plus/icons-vue'
	import { computed } from 'vue'
	import { useRoute } from 'vue-router'
	const route = useRoute()
	const filterBread = computed(() =>
		route.matched.filter(item => item?.meta && item.path !== '/' && item.meta?.title !== 'Dashboard')
	)
</script>

<template>
	<el-breadcrumb :separator-icon="ArrowRight">
		<el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
		<el-breadcrumb-item v-for="item in filterBread" :key="item.path">{{ item.meta.title }}</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<style scoped lang="scss">
	@import '../index.scss';
</style>
