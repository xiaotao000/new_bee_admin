<script setup lang="ts" name="adminInfo">
	import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
	import { onMounted, reactive, ref } from 'vue'
	import { updateName, updatePassword } from '@/api/modules/info'
	import { GlobalStore } from '@/stores'
	import { storeToRefs } from 'pinia'
	import md5 from 'md5'
	import router from '@/router'
	const globalStore = GlobalStore()
	const { loginUserName, nickName } = storeToRefs(globalStore)
	const nameForm = reactive<any>({
		loginUserName: '',
		nickName: ''
	})
	onMounted(() => {
		nameForm.loginUserName = loginUserName
		nameForm.nickName = nickName
	})
	const passwordForm = reactive({
		newPassword: '',
		originalPassword: ''
	})
	const nameRules = ref<FormRules>({
		loginUserName: [
			{ required: true, message: '登入名不能为空' },
			{ max: 10, min: 2, message: '登入名不能小于2大于10' }
		],
		nickName: [{ required: true, message: '昵称不能为空' }]
	})
	const passwordRule = ref<FormRules>({
		originalPassword: [
			{ required: true, message: '旧密码不能为空' },
			{ max: 20, min: 6, message: '旧密码不能小于6大于20' }
		],
		newPassword: [
			{ required: true, message: '新密码不能为空' },
			{ max: 20, min: 6, message: '新密码不能小于6大于20' }
		]
	})
	const nickNameForm = ref<FormInstance>()
	const passForm = ref<FormInstance>()
	const submitName = async () => {
		await nickNameForm.value?.validate()
		await updateName(nameForm)
		ElMessage.success('修改成功！！！')
		try {
		} catch (error) {
			console.log('取消')
		}
	}
	const submitPassword = async () => {
		try {
			await passForm.value?.validate()
			await updatePassword({ originalPassword: md5(passwordForm.originalPassword), newPassword: md5(passwordForm.newPassword) })
			ElMessage.success('修改成功！！！')
			router.push('/login')
			globalStore.eliminate()
		} catch (error) {
			console.log('取消')
		}
	}
</script>

<template>
	<el-card class="box-card">
		<div>
			<el-form
				ref="nickNameForm"
				:rules="nameRules"
				label-position="left"
				label-width="100px"
				style="max-width: 350px"
				:model="nameForm"
				status-icon
				class="demo-ruleForm"
			>
				<el-form-item label="登入名：" prop="loginUserName">
					<el-input v-model="nameForm.loginUserName" autocomplete="off" />
				</el-form-item>
				<el-form-item label="昵称：" prop="nickName">
					<el-input v-model="nameForm.nickName" autocomplete="off" />
				</el-form-item>
			</el-form>
			<el-form-item style="margin-left: 100px">
				<el-button type="primary" @click="submitName">确认修改</el-button>
			</el-form-item>
		</div>
	</el-card>
	<el-card class="box-card" style="margin-top: 20px">
		<div>
			<el-form
				:rules="passwordRule"
				ref="passForm"
				label-position="left"
				label-width="100px"
				style="max-width: 350px"
				:model="passwordForm"
				status-icon
				class="demo-ruleForm"
			>
				<el-form-item label="原密码：" prop="originalPassword">
					<el-input v-model="passwordForm.originalPassword" autocomplete="off" />
				</el-form-item>
				<el-form-item label="新密码：" prop="newPassword">
					<el-input v-model="passwordForm.newPassword" autocomplete="off" />
				</el-form-item>
			</el-form>
			<el-form-item style="margin-left: 100px">
				<el-button type="primary" @click="submitPassword">确认修改</el-button>
			</el-form-item>
		</div>
	</el-card>
</template>

<style scoped lang="scss"></style>
