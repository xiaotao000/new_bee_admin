<script setup lang="ts" name="goods">
	import { getGoods, updateStatus } from '@/api/modules/good'
	import { ElMessage } from 'element-plus'
	import { onMounted, reactive } from 'vue'
	import { Plus } from '@element-plus/icons-vue'

	const data = reactive({
		page: {
			pageNumber: 1,
			pageSize: 10,
			goodsName: '',
			goodsSellStatus: ''
		},
		totalCount: 0,
		list: [],
		loading: false
	})
	onMounted(() => {
		getGoodsList()
	})
	const getGoodsList = async () => {
		const {
			data: { list, totalCount }
		} = await getGoods(data.page)
		data.list = list
		data.totalCount = totalCount
	}
	const handleSizeChange = (val: number) => {
		data.page.pageSize = val
		getGoodsList()
	}
	const handleCurrentChange = (val: number) => {
		data.page.pageNumber = val
		getGoodsList()
	}
	const status = async (sellStatus, id) => {
		const data = {
			ids: []
		}
		data.ids.push(id)
		await updateStatus({ sellStatus: sellStatus === 1 ? 0 : 1, data })
		ElMessage.success('修改成功')
		getGoodsList()
	}
</script>

<template>
	<el-button type="primary" :icon="Plus">新增</el-button>
	<el-table v-loading="data.loading" border :data="data.list" style="width: 100%">
		<el-table-column type="selection" width="55" />
		<el-table-column prop="goodsId" label="商品编号" />
		<el-table-column prop="goodsName" label="商品名" />
		<el-table-column prop="goodsIntro" label="商品简介" />
		<el-table-column label="商品图片">
			<template v-slot="{ row }">
				<el-image style="width: 100px; height: 100px" :src="row.goodsCoverImg" />
			</template>
		</el-table-column>
		<el-table-column prop="stockNum" label="商品库存" />
		<el-table-column prop="sellingPrice" label="商品售价" />
		<!-- goodsSellStatus -->
		<el-table-column label="商品状态">
			<template v-slot="{ row }">
				<el-link :type="row.goodsSellStatus === 0 ? 'primary' : 'danger'" :underline="false">{{
					row.goodsSellStatus === 0 ? '销售中' : '已下架'
				}}</el-link>
			</template>
		</el-table-column>
		<el-table-column label="操作">
			<template v-slot="{ row }">
				<el-link type="primary" :underline="false" @click="$router.push({ path: '/good', query: { goodsId: row.goodsId } })"
					>修改</el-link
				>

				<el-popconfirm
					:title="row.goodsSellStatus === 0 ? '你确定要下架吗？' : '你确定要上架吗？'"
					@confirm="status(row.goodsSellStatus, row.goodsId)"
				>
					<template #reference>
						<el-link type="primary" :underline="false">{{ row.goodsSellStatus === 0 ? '下架' : '上架' }}</el-link>
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
</template>

<style scoped lang="scss">
	.el-link {
		margin-right: 8px;
	}
	.el-pagination {
		margin-top: 20px;
		.el-pager + button.btn-nex {
			margin-right: 8px;
		}
	}
	.el-table {
		margin-top: 20px;
	}
</style>
