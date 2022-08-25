<script setup lang="ts">
	import { type FormRules, type FormInstance, ElMessage } from 'element-plus'
	import { reactive, ref } from 'vue'
	import { addAndUpdate } from '@/api/modules/category'

	const data = reactive({
		dialogVisible: false,
		ruleForm: {
			categoryLevel: '',
			categoryName: '',
			categoryId: 0,
			categoryRank: 0,
			parentId: 0
		}
	})
	const open = (page: any) => {
		data.ruleForm.categoryId = page.parentId
		data.ruleForm.categoryRank = page.categoryRank
		data.ruleForm.parentId = page.parentId
		data.ruleForm.categoryLevel = page.categoryLevel
		openDialog()
	}
	const emit = defineEmits(['reload'])

	const ruleFormRef = ref<FormInstance>()
	const rules = ref<FormRules>({
		categoryName: [{ required: true, message: '名称不能为空' }],
		categoryRank: [{ required: true, message: '排序值不能为空' }]
	})
	const closeDialog = () => {
		ruleFormRef.value?.resetFields()
		data.dialogVisible = false
	}
	const openDialog = () => {
		ruleFormRef.value?.resetFields()
		data.dialogVisible = true
	}
	const update = value => {
		data.ruleForm = { ...value }
	}
	const subForm = async () => {
		try {
			await ruleFormRef.value?.validate()
			await addAndUpdate(data.ruleForm)
			ElMessage.success(data.ruleForm.categoryId ? '修改成功' : '新增成功')
			closeDialog()
			emit('reload')
		} catch (error) {
			console.log('失败')
		}
	}
	defineExpose({
		openDialog,
		closeDialog,
		update,
		open
	})
</script>

<template>
	<el-dialog v-model="data.dialogVisible" title="添加分类" width="30%" :before-close="closeDialog">
		<el-form ref="ruleFormRef" :model="data.ruleForm" status-icon label-width="120px" :rules="rules" class="demo-ruleForm">
			<el-form-item label="分类名称" prop="categoryName">
				<el-input v-model="data.ruleForm.categoryName" autocomplete="off" />
			</el-form-item>
			<el-form-item label="排序值" prop="categoryRank">
				<el-input v-model="data.ruleForm.categoryRank" autocomplete="off" />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="closeDialog">取消</el-button>
			<el-button type="primary" @click="subForm">确定</el-button>
		</template>
	</el-dialog>
</template>

<style scoped lang="scss"></style>
