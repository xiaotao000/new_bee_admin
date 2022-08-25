<script setup lang="ts" name="order_detail">
	import { useRoute } from 'vue-router'
	import { getOrderDetails } from '@/api/modules/category'
	import { onMounted, reactive } from 'vue'
	const order = reactive({
		createTime: '',
		orderStatusString: '',
		orderNo: '',
		newBeeMallOrderItemVOS: []
	})
	const route = useRoute()
	onMounted(() => {
		getOrderDetail()
	})
	const getOrderDetail = async () => {
		const {
			data: { createTime, orderStatusString, newBeeMallOrderItemVOS, orderNo }
		} = await getOrderDetails(route.params.id)
		order.createTime = createTime
		order.orderStatusString = orderStatusString
		order.orderNo = orderNo
		order.newBeeMallOrderItemVOS = newBeeMallOrderItemVOS
	}
</script>

<template>
	<el-icon>
		<div @click="$router.go(-1)">
			<Back />
			返回
		</div>
	</el-icon>
	<div class="data">
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<span>出货状态</span>
				</div>
			</template>
			<div>{{ order.orderStatusString }}</div>
		</el-card>
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<span>创建时间</span>
				</div>
			</template>
			<div>{{ order.createTime }}</div>
		</el-card>
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<span>订单号</span>
				</div>
			</template>
			<div>{{ order.orderNo }}</div>
		</el-card>
	</div>
	<el-table :data="order.newBeeMallOrderItemVOS" border style="width: 100%">
		<el-table-column label="商品图片">
			<template v-slot="{ row }">
				<el-image style="width: 100px; height: 100px" :src="row.goodsCoverImg" />
			</template>
		</el-table-column>
		<el-table-column prop="goodsId" label="商品编号" />
		<el-table-column prop="goodsName" label="商品名称" />
		<el-table-column prop="goodsCount" label="商品数量" />
		<el-table-column prop="sellingPrice" label="价格" />
	</el-table>
</template>

<style scoped lang="scss">
	.el-icon {
		width: 60px;
		cursor: pointer;
	}
	.data {
		display: flex;
		margin-bottom: 50px;
		margin-top: 20px;
		.box-card {
			flex: 1;
			margin: 0 10px;
		}
	}
	.box-card {
		width: 310px;
	}
</style>
