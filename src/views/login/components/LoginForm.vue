<script setup lang="ts">
	import { User, Lock, CircleClose, UserFilled } from '@element-plus/icons-vue'
	import { FormRules, FormInstance, ElMessage } from 'element-plus'
	import { GlobalStore } from '@/stores'
	import { ref } from 'vue'
	import { loginApi } from '@/api/modules/user'
	import { useRouter } from 'vue-router'
	import md5 from 'md5'
	const router = useRouter()
	const loginForm = ref({ userName: '', passwordMd5: '' })
	const loading = ref(false)
	const loginRules = ref<FormRules>({
		userName: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
		passwordMd5: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
	})

	const formRef = ref<FormInstance>()

	const submitForm = async () => {
		try {
			await formRef.value.validate()
			const { userName, passwordMd5 } = loginForm.value
			loading.value = true
			const { data } = await loginApi({ userName, passwordMd5: md5(passwordMd5) })
			GlobalStore().token = data
			loading.value = false
			ElMessage.success('登入成功！')
			router.push('/welcome')
		} catch (error) {
			console.log('失败', error)
			loading.value = false
		}
	}
</script>

<template>
	<div class="login-form">
		<el-form ref="formRef" :model="loginForm" :rules="loginRules">
			<el-form-item prop="userName">
				<el-input v-model="loginForm.userName" :prefix-icon="User" placeholder="用户名: admin/user " />
			</el-form-item>
			<el-form-item prop="passwordMd5">
				<el-input v-model="loginForm.passwordMd5" :prefix-icon="Lock" type="passwordMd5" placeholder="密码： 123456" />
			</el-form-item>
		</el-form>
		<div class="form-btn">
			<el-button :icon="CircleClose" type="default" round @click="formRef?.resetFields()">重置</el-button>
			<el-button :icon="UserFilled" type="primary" round :loading="loading" @click="submitForm">登录</el-button>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import '../index.scss';
</style>
