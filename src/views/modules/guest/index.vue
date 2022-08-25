<script setup lang="ts" name="guest">
	import { getUser, updateUser } from '@/api/modules/category'
	import { onMounted, reactive } from 'vue'
	import { Delete, Plus } from '@element-plus/icons-vue'
	import { ElMessage } from 'element-plus'

	const data = reactive({
		page: {
			pageNumber: 1,
			pageSize: 10,
			lockStatus: ''
		},
		totalCount: 0,
		userList: [],
		loading: false,
		selection: []
	})
	onMounted(() => {
		getUserList()
	})

	const getUserList = async () => {
		data.loading = true
		const {
			data: { list, totalCount }
		} = await getUser(data.page)
		data.userList = list
		data.loading = false
		data.totalCount = totalCount
	}
	const selectChange = value => {
		data.selection = [...value]
	}
	const disable = async lockStatus => {
		const ids = data.selection.map(item => item.userId)
		await updateUser({ ids, lockStatus })
		ElMessage.success(lockStatus === 1 ? '禁用成功' : '解除成功')
		getUserList()
	}
	const handleSizeChange = (val: number) => {
		data.page.pageSize = val
		getUserList()
	}
	const handleCurrentChange = (val: number) => {
		data.page.pageNumber = val
		getUserList()
	}
</script>

<template>
	<el-button type="primary" :icon="Plus" @click="disable(0)">解除禁用</el-button>
	<el-button type="danger" :icon="Delete" @click="disable(1)">禁用账号</el-button>
	<el-table v-loading="data.loading" border @selection-change="selectChange" :data="data.userList" style="width: 100%">
		<el-table-column type="selection" width="55" />
		<el-table-column prop="nickName" label="昵称" />
		<el-table-column prop="loginName" label="登入名" />
		<el-table-column label="身份状态">
			<template #default="{ row }">
				<el-link :type="row.lockedFlag === 1 ? 'danger' : 'success'" :underline="false">{{
					row.lockedFlag === 1 ? '禁用' : '正常'
				}}</el-link>
			</template>
		</el-table-column>
		<el-table-column label="是否注销">
			<template #default="{ row }">
				<el-link :type="row.isDeleted === 1 ? 'danger' : 'success'" :underline="false">{{
					row.isDeleted === 1 ? '禁用' : '正常'
				}}</el-link>
			</template>
		</el-table-column>
		<el-table-column prop="createTime" label="注册时间" />
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
	.el-table {
		margin-top: 20px;
	}
</style>
