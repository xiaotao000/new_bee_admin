<script setup lang="ts" name="order">
	import { getOrders, updateCheckDone, updateCheckOut, updateClose } from '@/api/modules/category'
	import { onMounted, reactive, ref } from 'vue'
	import { Delete, HomeFilled } from '@element-plus/icons-vue'
	import router from '@/router'
	import { ElMessage } from 'element-plus'

	const data = reactive({
		page: {
			pageNumber: 1,
			pageSize: 10,
			orderNo: '',
			orderStatus: ''
		},
		totalCount: 0,
		list: [],
		loading: false,
		selection: []
	})
	onMounted(() => {
		getOrdersList()
	})
	const getOrdersList = async () => {
		data.loading = true
		const {
			data: { list, totalCount }
		} = await getOrders(data.page)
		data.loading = false
		data.list = list
		data.totalCount = totalCount
	}
	const options = ref({
		0: '待支付',
		1: '已支付',
		2: '配货完成',
		3: '出库成功',
		4: '交易成功',
		'-1': '手动关闭',
		'-2': '超时关闭',
		'-3': '商家关闭'
	})
	const change = () => {
		getOrdersList()
	}
	const orderNo = () => {
		orderNo()
	}
	const orderDetail = id => {
		router.push({ name: 'order_detail', params: { id } })
	}
	const selectChange = value => {
		data.selection = [...value]
	}
	const updateCheck = async () => {
		const selectionList = data.selection.map(item => item.carouselId)
		await updateCheckDone({ ids: selectionList })
		ElMessage.success('配货成功')
		getOrdersList()
	}
	const updateOut = async () => {
		const selectionList = data.selection.map(item => item.carouselId)
		await updateCheckOut({ ids: selectionList })
		ElMessage.success('出库成功')
		getOrdersList()
	}
	const CloseOrder = async () => {
		const selectionList = data.selection.map(item => item.orderId)
		await updateClose({ ids: selectionList })
		ElMessage.success('关闭订单成功')
		getOrdersList()
	}
	// 配送
	const delivery = async id => {
		const data = {
			ids: []
		}
		data.ids.push(id)
		await updateCheckDone(data)
		ElMessage.success('配货成功')
		getOrdersList()
	}
	// 出库
	const CheckOut = async id => {
		const data = {
			ids: []
		}
		data.ids.push(id)
		await updateCheckOut(data)
		ElMessage.success('出库成功')
		getOrdersList()
	}
	// 关闭订单
	const Close = async id => {
		const data = {
			ids: []
		}
		data.ids.push(id)
		await updateClose(data)
		ElMessage.success('关闭成功')
		getOrdersList()
	}
	const handleSizeChange = (val: number) => {
		data.page.pageSize = val
		getOrdersList()
	}
	const handleCurrentChange = (val: number) => {
		data.page.pageNumber = val
		getOrdersList()
	}
</script>

<template>
	<el-input style="width: 200px" class="w-50 m-2" @blur="orderNo" v-model="data.page.orderNo" placeholder="请输入订单号" />
	<el-select v-model="data.page.orderStatus" @change="change">
		<el-option label="全部" value="" />
		<el-option v-for="(item, i) in options" :key="i" :label="item" :value="i" />
	</el-select>
	<el-button type="primary" :icon="HomeFilled" @click="updateCheck">配货完成</el-button>
	<el-button type="primary" :icon="HomeFilled" @click="updateOut">出库</el-button>
	<el-button type="danger" :icon="Delete" @click="CloseOrder">关闭订单</el-button>

	<el-table v-loading="data.loading" border :data="data.list" style="width: 100%" @selection-change="selectChange">
		<el-table-column type="selection" width="55" />
		<el-table-column prop="orderNo" label="订单号" />
		<el-table-column prop="totalPrice" label="订单总价" />
		<el-table-column prop="totalPrice" label="订单状态">
			<template v-slot="{ row }">
				<el-link :underline="false">{{ options[row.orderStatus] }}</el-link>
			</template>
		</el-table-column>
		<el-table-column label="支付方式">
			<template v-slot="{ row }">
				<el-link :underline="false">{{ row.payType === 1 ? '微信' : '支付宝' }}</el-link>
			</template>
		</el-table-column>
		<el-table-column prop="createTime" label="创建时间" />
		<el-table-column label="操作" width="180px">
			<template v-slot="{ row }">
				<el-popconfirm v-if="row.orderStatus === 1" title="你确定要配送吗" @confirm="delivery(row.orderId)">
					<template #reference>
						<el-link type="primary" :underline="false">配货完成</el-link>
					</template>
				</el-popconfirm>
				<el-popconfirm v-if="row.orderStatus === 2" title="你确定要出库吗" @confirm="CheckOut(row.orderId)">
					<template #reference>
						<el-link type="primary" :underline="false">出库</el-link>
					</template>
				</el-popconfirm>
				<el-popconfirm
					v-if="row.orderStatus > -1 && row.orderStatus < 4"
					title="你确定要关闭订单吗"
					@confirm="Close(row.orderId)"
				>
					<template #reference>
						<el-link type="primary" :underline="false">关闭订单</el-link>
					</template>
				</el-popconfirm>
				<el-link type="primary" :underline="false" @click="orderDetail(row.orderId)">订单详情</el-link>
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
	<!-- [1, 2, 3] -->
	<!-- [1, 配送完成， 关闭订单] -->
	<!-- [2, 出库 关闭订单] -->
	<!-- [3, 关闭 关闭订单] -->
</template>

<style scoped lang="scss">
	.el-table {
		margin-top: 20px;
	}
	.el-input {
		margin-right: 12px;
	}
	.el-select {
		margin-right: 12px;
	}
	.el-link {
		margin-right: 8px;
	}
</style>
