<script setup lang="ts">
	import { ElMessageBox, ElNotification } from 'element-plus'
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import InfoDialog from './InfoDialog.vue'
	import PasswordDialog from './PasswordDialog.vue'
	import { GlobalStore } from '@/stores'
	const router = useRouter()
	const infoRef = ref<InstanceType<typeof InfoDialog> | null>()
	const PasswordRef = ref<InstanceType<typeof InfoDialog> | null>()

	const logout = () => {
		ElMessageBox.confirm('你确定要退出吗?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消'
		}).then(async () => {
			ElNotification({ type: 'success', title: '退出成功', message: '已退出登录, 正在跳转登录' })
			await GlobalStore().logOut()
			router.push('/login')
		})
	}
</script>

<template>
	<div class="avatar">
		<el-dropdown trigger="click">
			<img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="" />
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item @click="infoRef?.openDialog()">个人资料</el-dropdown-item>
					<el-dropdown-item @click="PasswordRef?.openDialog()">修改密码</el-dropdown-item>
					<el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<InfoDialog ref="infoRef" />
		<PasswordDialog ref="PasswordRef" />
	</div>
</template>

<style scoped lang="scss">
	@import '../index.scss';
</style>
