<script setup lang="ts" name="Pagination">
	defineProps<{
		pageable: {
			total: number
			pageSize: number
			pageNumber: number
		}
	}>()
	defineEmits(['sizeChange', 'pageChange'])
</script>

<template>
	<el-pagination
		background
		layout="total, sizes, prev, pager, next, jumper"
		:page-sizes="[10, 20, 30, 40, 50]"
		:total="pageable.total"
		:currentPage="pageable.pageNumber"
		:page-size="pageable.pageSize"
		@current-change="$emit('pageChange', $event)"
		@size-change="$emit('sizeChange', $event)"
	/>
</template>

<style scoped lang="scss"></style>
