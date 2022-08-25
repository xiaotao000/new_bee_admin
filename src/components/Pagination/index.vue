<script setup lang="ts">
	defineProps<{
		page: {
			totalCount: number
			pageNumber: number
			pageSize: number
		}
	}>()
	defineEmits(['sizeChange', 'pageChange'])
</script>

<template>
	<el-pagination
		background
		layout="prev, pager, next, total, sizes"
		@size-change="$emit('pageChange', $event)"
		@current-change="$emit('sizeChange', $event)"
		:page-sizes="[10, 20, 30, 40, 50, 100]"
		:currentPage="page.pageNumber"
		:current-page="page.pageSize"
		:total="page.totalCount"
	/>
</template>

<style scoped lang="scss"></style>
