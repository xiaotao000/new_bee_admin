<script setup lang="ts" name="new">
	import { onMounted, reactive, ref } from 'vue'
	import { getConfigs, addHotAndUpdate, removeConfigs } from '@/api/modules/config'
	import { Delete, Plus } from '@element-plus/icons-vue'
	import { type FormRules, type FormInstance, ElMessage } from 'element-plus'

	const data = reactive({
		page: {
			pageNumber: 1,
			pageSize: 10,
			configType: 4
		},
		resultCode: 0,
		newList: [],
		dialogVisible: false,
		selection: []
	})
	const newForm = ref({
		configName: '', // 商品名称
		redirectUrl: '', // 跳转链接
		configRank: 0, // 排序值
		goodsId: 0, // 商品编号
		configId: '', // id
		configType: 4
	})
	const newRules = ref<FormRules>({
		configName: [{ required: true, message: '名称不能为空' }],
		configRank: [{ required: true, message: '排序不能为空' }],
		goodsId: [{ required: true, message: '商品编号不能为空' }]
	})
	const ruleFormRef = ref<FormInstance>()
	onMounted(() => {
		getnewList()
	})
	const getnewList = async () => {
		const {
			data: { list, totalCount }
		} = await getConfigs(data.page)
		data.newList = list
		data.resultCode = totalCount
	}
	const handleSizeChange = (val: number) => {
		data.page.pageSize = val
		getnewList()
	}
	const handleCurrentChange = (val: number) => {
		data.page.pageNumber = val
		getnewList()
	}

	const closeDialog = () => {
		resetForm()
		ruleFormRef.value?.resetFields()
		data.dialogVisible = false
	}
	const openDialog = () => {
		resetForm()
		ruleFormRef.value?.resetFields()
		data.dialogVisible = true
	}
	const resetForm = () => {
		Object.assign(newForm, {
			configName: '', // 商品名称
			redirectUrl: '', // 跳转链接
			configRank: 0, // 排序值
			goodsId: 0, // 商品编号
			configId: '', // id
			configType: 5
		})
	}
	const subForm = async () => {
		try {
			await ruleFormRef.value?.validate()
			await addHotAndUpdate(newForm.value)
			ElMessage.success(newForm.value.configId ? '修改成功' : '添加成功')
			getnewList()
			closeDialog()
		} catch (error) {
			console.log('失败')
		}
	}
	const update = row => {
		openDialog()
		newForm.value = { ...row }
	}
	const removenew = async (id: number) => {
		const data = {
			ids: []
		}
		data.ids.push(id)
		await removeConfigs(data)
		ElMessage.success('删除成功')
		getnewList()
	}

	const selectChange = value => {
		data.selection = [...value]
	}
	const batchRemove = async () => {
		const list = {
			ids: []
		}
		const removeList = data.selection.map(item => item.carouselId)
		list.ids = removeList
		await removeConfigs(list)
		ElMessage.success('删除成功')
		getnewList()
	}
	const { configType } = defineProps<{
		configType: number
	}>()
	data.page.configType = configType
	newForm.value.configType = configType
	console.log(configType)
</script>

<template>
	<el-button type="primary" :icon="Plus" @click="openDialog">新增</el-button>
	<el-button type="danger" :icon="Delete" :disabled="!data.selection.length" @click="batchRemove">批量删除</el-button>
	<el-table :data="data.newList" border @selection-change="selectChange" style="width: 100%">
		<el-table-column type="selection" width="55" />
		<el-table-column label="商品名称" prop="configName"></el-table-column>
		<el-table-column prop="name" label="跳转链接">
			<template #default="scope">
				<el-link :href="scope.row.redirectUrl" :underline="false" target="_blank" type="primary">
					{{ scope.row.redirectUrl }}
				</el-link>
			</template>
		</el-table-column>
		<el-table-column prop="configRank" label="排序值" />
		<el-table-column prop="goodsId" label="商品编号" />
		<el-table-column prop="createTime" label="添加时间" />
		<el-table-column label="操作">
			<template #default="{ row }">
				<el-link type="primary" :underline="false" @click="update(row)">修改</el-link>
				<el-popconfirm title="你确定要删除吗？" @confirm="removenew(row.configId)">
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
		:total="data.resultCode"
	/>
	<el-dialog v-model="data.dialogVisible" :before-close="closeDialog" title="新增" width="30%">
		<el-form ref="ruleFormRef" :model="newForm" label-width="120px" :rules="newRules" class="demo-ruleForm">
			<el-form-item label="商品名称" prop="configName">
				<el-input v-model="newForm.configName" />
			</el-form-item>
			<el-form-item label="跳转链接">
				<el-input v-model="newForm.redirectUrl" />
			</el-form-item>
			<el-form-item label="排序值" prop="configRank">
				<el-input-number v-model="newForm.configRank" :min="1" controls-position="right" size="large" />
			</el-form-item>
			<el-form-item label="商品编号" prop="goodsId">
				<el-input-number v-model="newForm.goodsId" controls-position="right" size="large" />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="closeDialog">取消</el-button>
				<el-button type="primary" @click="subForm">确定</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<style scoped lang="scss">
	.el-table {
		margin-top: 20px;
	}
	.el-input-number--large {
		width: 100%;
	}
	.el-link {
		margin-right: 8px;
	}
	.el-pagination {
		margin-top: 20px;
		.el-pager + button.btn-nex {
			margin-right: 8px;
		}
	}
</style>
