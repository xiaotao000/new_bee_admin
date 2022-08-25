<script setup lang="ts" name="login">
	import LoginForm from './components/LoginForm.vue'
</script>

<template>
	<div class="login flx-center">
		<div class="login-container">
			<div class="left-bg">
				<el-carousel indicator-position="none" arrow="never">
					<el-carousel-item>
						<img src="@/assets/images/login_left0.png" alt="" />
					</el-carousel-item>
					<el-carousel-item>
						<img src="@/assets/images/login_left1.png" alt="" />
					</el-carousel-item>
					<el-carousel-item>
						<img src="@/assets/images/login_left2.png" alt="" />
					</el-carousel-item>
					<el-carousel-item>
						<img src="@/assets/images/login_left3.png" alt="" />
					</el-carousel-item>
					<el-carousel-item>
						<img src="@/assets/images/login_left4.png" alt="" />
					</el-carousel-item>
					<el-carousel-item>
						<img src="@/assets/images/login_left5.png" alt="" />
					</el-carousel-item>
				</el-carousel>
			</div>
			<div class="login-box">
				<div class="login-logo">
					<img class="login-icon" src="https://pinia.vuejs.org/logo.svg" />
					<p class="logo-text">New-Bee-Admin</p>
				</div>
				<div class="el-from-item">
					<LoginForm />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import './index.scss';
</style>
