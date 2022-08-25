<script setup lang="ts" name="swiper">
	import { getSwiper, removeSwiper, addSwiperAndUpdate } from '@/api/modules/config'
	import { computed, onMounted, reactive, ref } from 'vue'
	import { Delete, Plus } from '@element-plus/icons-vue'
	import { type FormRules, type FormInstance, ElMessage, UploadProps } from 'element-plus'
	import { GlobalStore } from '@/stores'
	import Pagination from '@/components/Pagination/index.vue'

	const data = reactive({
		page: {
			pageNumber: 1,
			pageSize: 10,
			totalCount: 0
		},
		list: [],
		dialogVisible: false,
		selection: []
	})
	const getSwiperList = async () => {
		const {
			data: { list, totalCount }
		} = await getSwiper(data.page)
		data.list = list
		data.page.totalCount = totalCount
	}
	onMounted(() => {
		getSwiperList()
	})
	const swiperForm = reactive({
		carouselUrl: '', // 图片地址
		redirectUrl: '', // 跳转地址
		carouselRank: 0, // 排序值
		carouselId: ''
	})
	const swiperRules = ref<FormRules>({
		carouselUrl: [{ required: true, message: '轮播图不能为空' }],
		carouselRank: [{ required: true, message: '排序值不能为空' }]
	})
	const handleSizeChange = (val: number) => {
		data.page.pageSize = val
		getSwiperList()
	}
	const handleCurrentChange = (val: number) => {
		data.page.pageNumber = val
		getSwiperList()
	}
	const removeSwiperList = async (id: number) => {
		const data = {
			ids: []
		}
		data.ids.push(id)
		await removeSwiper(data)
		ElMessage.success('删除成功')
		getSwiperList()
	}
	const headers = computed(() => ({ token: GlobalStore().token }))
	const beforeAvatarUpload: UploadProps['beforeUpload'] = rawFile => {
		if (rawFile.type !== 'image/jpeg') {
			ElMessage.error('图片格式只能为JPG')
			return false
		} else if (rawFile.size / 1024 / 1024 > 2) {
			ElMessage.error('图片大小不能大于2MB')
			return false
		}
		return true
	}
	const handleAvatarSuccess: UploadProps['onSuccess'] = response => {
		const { data } = response
		swiperForm.carouselUrl = data
	}
	const ruleFormRef = ref<FormInstance>()

	const closeDialog = () => {
		ruleFormRef.value?.resetFields()
		data.dialogVisible = false
		resetForm()
	}
	const openDialog = () => {
		ruleFormRef.value?.resetFields()
		data.dialogVisible = true
		resetForm()
	}
	const subForm = async () => {
		try {
			await ruleFormRef.value?.validate()
			await addSwiperAndUpdate(swiperForm)
			ElMessage.success(swiperForm.carouselId ? '修改成功' : '添加成功')
			getSwiperList()
			closeDialog()
		} catch (error) {
			console.log('失败')
		}
	}
	const update = row => {
		openDialog()
		Object.assign(swiperForm, row)
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
		await removeSwiper(list)
		ElMessage.success('删除成功')
		getSwiperList()
	}
	const resetForm = () => {
		Object.assign(swiperForm, {
			carouselUrl: '', // 图片地址
			redirectUrl: '', // 跳转地址
			carouselRank: 0, // 排序值
			carouselId: ''
		})
	}
</script>

<template>
	<el-button type="primary" :icon="Plus" @click="data.dialogVisible = true">新增</el-button>
	<el-button type="danger" :icon="Delete" :disabled="!data.selection.length" @click="batchRemove">批量删除</el-button>
	<el-table :data="data.list" border style="width: 100%" @selection-change="selectChange">
		<el-table-column type="selection" width="55" />
		<el-table-column label="轮播图">
			<!-- carouselUrl -->
			<template #default="scope">
				<el-image style="width: 100px; height: 100px" :src="scope.row.carouselUrl" />
			</template>
		</el-table-column>
		<el-table-column prop="name" label="跳转链接">
			<template #default="scope">
				<el-link :href="scope.row.redirectUrl" :underline="false" target="_blank" type="primary">
					{{ scope.row.redirectUrl }}
				</el-link>
			</template>
		</el-table-column>
		<el-table-column prop="carouselRank" label="排序值" />
		<el-table-column prop="createTime" label="添加时间" />
		<el-table-column label="操作">
			<template #default="{ row }">
				<el-link type="primary" :underline="false" @click="update(row)">修改</el-link>
				<el-popconfirm title="你确定要删除吗？" @confirm="removeSwiperList(row.carouselId)">
					<template #reference>
						<el-link type="primary" :underline="false">删除</el-link>
					</template>
				</el-popconfirm>
			</template>
		</el-table-column>
	</el-table>
	<Pagination :page="data.page" @page-change="handleSizeChange" @size-change="handleCurrentChange" />
	<el-dialog
		v-model="data.dialogVisible"
		:title="swiperForm.carouselId ? '修改轮播图' : '新增轮播图'"
		width="30%"
		:before-close="closeDialog"
	>
		<el-form ref="ruleFormRef" :model="swiperForm" label-width="120px" :rules="swiperRules" class="demo-ruleForm">
			<el-form-item label="图片" prop="carouselUrl">
				<el-upload
					class="avatar-uploader"
					:headers="headers"
					action="http://zhi.zeng.pub/new-bee/manage-api/v1/upload/file"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload"
				>
					<img v-if="swiperForm.carouselUrl" :src="swiperForm.carouselUrl" class="avatar" />
					<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
				</el-upload>
			</el-form-item>
			<el-form-item label="跳转链接">
				<el-input v-model="swiperForm.redirectUrl" />
			</el-form-item>
			<el-form-item label="排序值" prop="carouselRank">
				<el-input-number v-model="swiperForm.carouselRank" :min="1" controls-position="right" size="large" />
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
	.el-input-number--large {
		width: 100%;
	}
	.el-table {
		margin-top: 20px;
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
	.avatar-uploader .avatar {
		width: 100px;
		height: 100px;
		display: block;
	}
	.avatar-uploader,
	.el-upload {
		border: 1px dashed var(--el-border-color);
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: var(--el-transition-duration-fast);
	}

	.avatar-uploader .el-upload:hover {
		border-color: var(--el-color-primary);
	}

	.el-icon.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		text-align: center;
	}
</style>
