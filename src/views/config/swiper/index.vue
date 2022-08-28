<script setup lang="ts" name="swiper">
	import { getSwiper, removeSwiper } from '@/api/modules/config'
	import { ColumnProps } from '@/components/ProTable/interface'
	import ProTable from '@/components/ProTable/index.vue'
	import { ElMessage } from 'element-plus'
	import { ref } from 'vue'
	import Dialog from './components/dialog.vue'

	const columns: Partial<ColumnProps>[] = [
		{ type: 'selection' },
		{ label: '轮播图', prop: 'carouselUrl', image: true },
		{ label: '跳转链接', prop: 'redirectUrl', link: true },
		{ label: '排序值', prop: 'carouselRank', tag: true },
		{ label: '添加时间', prop: 'createTime' },
		{ label: '操作', prop: 'operation' }
	]
	const tableRef = ref<InstanceType<typeof ProTable> | null>()
	const dialogRef = ref<InstanceType<typeof Dialog> | null>()
	const handleRemove = async (ids: any[]) => {
		await removeSwiper({ ids })
		ElMessage.success('删除成功')
		tableRef.value.refresh()
	}
	const batchRemove = async () => {
		const removeList = tableRef.value.selectList.map(item => item.carouselId)
		await removeSwiper({ ids: removeList })
		ElMessage.success('删除成功')
		tableRef.value.refresh()
	}
	const update = row => {
		dialogRef.value.state.swiperForm = { ...row }
		dialogRef.value.openDialog()
	}
</script>

<template>
	<ProTable ref="tableRef" :columns="columns" :requestApi="getSwiper">
		<template #tableHeader="{ list }">
			<el-button
				icon="plus"
				type="primary"
				plain
				round
				@click="
					() => {
						dialogRef.openDialog()
					}
				"
				>增加</el-button
			>
			<el-popconfirm title="你确定要删除吗?" @confirm="batchRemove">
				<template #reference>
					<el-button icon="delete" type="danger" plain round :disabled="!list.length">批量删除</el-button>
				</template>
			</el-popconfirm>
		</template>
		<template #operation="{ row }">
			<el-button type="primary" link @click="update(row)">修改</el-button>
			<el-popconfirm title="确定删除吗?" @confirm="handleRemove([row.carouselId])">
				<template #reference>
					<el-button type="danger" link>删除</el-button>
				</template>
			</el-popconfirm>
		</template>
	</ProTable>
	<Dialog ref="dialogRef" @reload="tableRef?.refresh()" />
</template>

<style scoped lang="scss"></style>
