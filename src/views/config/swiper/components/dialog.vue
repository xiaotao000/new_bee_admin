<script setup lang="ts">
	import { reactive, ref, toRefs } from 'vue'
	import { type FormRules, type FormInstance, ElMessage } from 'element-plus'
	import { addSwiperAndUpdate } from '@/api/modules/config'
	import Upload from '@/components/Upload/index.vue'
	const state = reactive({
		dialogVisible: false,
		swiperForm: {
			carouselUrl: '', // 图片地址
			redirectUrl: '', // 跳转地址
			carouselRank: 0, // 排序值
			carouselId: ''
		}
	})
	const swiperRules = ref<FormRules>({
		carouselUrl: [{ required: true, message: '轮播图不能为空' }],
		carouselRank: [{ required: true, message: '排序值不能为空' }]
	})
	const ruleFormRef = ref<FormInstance>()
	const emit = defineEmits(['reload'])
	const closeDialog = () => {
		ruleFormRef.value?.resetFields()
		state.dialogVisible = false
	}
	const openDialog = () => {
		ruleFormRef.value?.resetFields()
		state.dialogVisible = true
	}
	const subForm = async () => {
		try {
			await ruleFormRef.value?.validate()
			await addSwiperAndUpdate(state.swiperForm)
			ElMessage.success(state.swiperForm.carouselId ? '修改成功' : '添加成功')
			emit('reload')
			closeDialog()
		} catch (error) {
			console.log('失败')
		}
	}
	const { dialogVisible, swiperForm } = toRefs(state)
	defineExpose({
		openDialog,
		state
	})
</script>

<template>
	<el-dialog
		v-model="dialogVisible"
		:title="swiperForm.carouselId ? '修改轮播图' : '新增轮播图'"
		width="30%"
		:before-close="closeDialog"
	>
		<el-form ref="ruleFormRef" :model="swiperForm" label-width="120px" :rules="swiperRules" class="demo-ruleForm">
			<el-form-item label="图片" prop="carouselUrl">
				<Upload v-model:url="swiperForm.carouselUrl" />
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

<style scoped lang="scss"></style>
