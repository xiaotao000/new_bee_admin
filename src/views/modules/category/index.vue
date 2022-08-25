<script setup lang="ts" name="category">
	import { onMounted, reactive, ref } from 'vue'
	import { getCategories, removeCategories } from '@/api/modules/category'
	import { Delete, Plus } from '@element-plus/icons-vue'
	import Dialog from './components/dialog.vue'
	import { ElMessage } from 'element-plus/es'
	const data = reactive({
		page: {
			pageNumber: 1,
			pageSize: 10,
			categoryLevel: 1,
			parentId: 0
		},
		totalCount: 0,
		list: [],
		selection: [],
		oldID: {
			categoryLevel: 0,
			parentId: 0
		},
		loading: false
	})
	const ids = [0]
	onMounted(() => {
		getCategoriesList()
	})
	const dialogRef = ref<InstanceType<typeof Dialog> | null>()
	const getCategoriesList = async () => {
		data.loading = true
		const {
			data: { list, totalCount }
		} = await getCategories(data.page)
		data.loading = false
		data.list = list
		data.totalCount = totalCount
	}
	// 下级分类
	const subordinate = async (value: any) => {
		data.loading = true
		ids[data.page.categoryLevel] = value.categoryId
		data.page.categoryLevel += 1
		if (data.page.categoryLevel >= 4) return
		data.page.parentId = value.categoryId
		const {
			data: { list, totalCount }
		} = await getCategories(data.page)
		data.loading = false
		data.list = list
		data.totalCount = totalCount
	}
	const selectChange = value => {
		data.selection = [...value]
	}
	const update = value => {
		dialogRef.value.update(value)
		dialogRef.value.openDialog()
	}
	const removeSwiperList = async (id: number) => {
		const data = {
			ids: []
		}
		data.ids.push(id)
		await removeCategories(data)
		ElMessage.success('删除成功')
		getCategoriesList()
	}
	const batchRemove = async () => {
		const list = {
			ids: []
		}
		const removeList = data.selection.map(item => item.categoryId)
		list.ids = removeList
		await removeCategories(list)
		ElMessage.success('删除成功')
		getCategoriesList()
	}
	const upCategoryLevel = async () => {
		data.loading = true
		data.page.categoryLevel--
		data.page.parentId = ids[data.page.categoryLevel - 1]
		data.page.parentId = data.oldID.parentId
		if (data.page.categoryLevel <= 0) return
		const {
			data: { list, totalCount }
		} = await getCategories(data.page)
		data.loading = false
		data.list = list
		data.totalCount = totalCount
	}
	const handleSizeChange = (val: number) => {
		data.page.pageSize = val
		getCategoriesList()
	}
	const handleCurrentChange = (val: number) => {
		data.page.pageNumber = val
		getCategoriesList()
	}
</script>

<template>
	<el-button type="primary" :icon="Plus" @click="dialogRef.open(data.page)">新增</el-button>
	<el-button type="danger" :icon="Delete" :disabled="!data.selection.length" @click="batchRemove">批量删除</el-button>
	<div style="margin-top: 20px" v-if="data.page.categoryLevel !== 1">
		<span @click="upCategoryLevel">
			<el-icon><Back /></el-icon>
			返回上一级
		</span>
	</div>
	<el-table v-loading="data.loading" :data="data.list" border style="width: 100%" @selection-change="selectChange">
		<el-table-column type="selection" width="55" />
		<el-table-column prop="categoryName" label="分类名称" />
		<el-table-column prop="categoryName" label="等级值">
			<template #default="{ row }">
				<el-tag type="success" v-if="row.categoryLevel === 1">一级</el-tag>
				<el-tag type="success" v-if="row.categoryLevel === 2">二级</el-tag>
				<el-tag type="success" v-if="row.categoryLevel === 3">三级</el-tag>
			</template>
		</el-table-column>
		<el-table-column prop="categoryRank" label="排序值" />
		<el-table-column prop="createTime" label="添加时间" />
		<el-table-column label="操作">
			<template #default="{ row }">
				<el-link type="primary" :underline="false" @click="update(row)">修改</el-link>
				<el-link type="primary" :underline="false" @click="subordinate(row)" v-if="data.page.categoryLevel != 3"
					>下级分类</el-link
				>
				<el-popconfirm title="你确定要删除吗？" @confirm="removeSwiperList(row.categoryId)">
					<template #reference>
						<el-link type="primary" :underline="false">删除</el-link>
					</template>
				</el-popconfirm>
			</template>
		</el-table-column>
	</el-table>
	<el-pagination
		background
		layout="prev, pager, next, total, sizes"
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:page-sizes="[10, 20, 30, 40, 50, 100]"
		:v-model:currentPage="data.page.pageNumber"
		:v-model:current-page="data.page.pageSize"
		:total="data.totalCount"
	/>
	<Dialog ref="dialogRef" @reload="getCategoriesList" />
</template>

<style scoped lang="scss">
	.el-link {
		margin-right: 8px;
	}
	.el-table {
		margin-top: 20px;
	}

	.el-pagination {
		margin-top: 20px;
		.el-pager + button.btn-nex {
			margin-right: 8px;
		}
	}
</style>
