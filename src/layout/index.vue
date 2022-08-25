<script setup lang="ts" name="Layout">
	import Menu from './Menu/index.vue'
	import Header from './Header/index.vue'
	import Footer from './Footer/index.vue'
</script>

<template>
	<!-- 布局容器 -->
	<el-container>
		<!-- 侧边栏 -->
		<el-aside>
			<Menu />
		</el-aside>
		<!-- 右侧布局容器 -->
		<el-container>
			<!-- 头部 -->
			<el-header><Header /></el-header>
			<!-- 内容 -->
			<el-main>
				<div class="main-content">
					<router-view></router-view>
				</div>
			</el-main>
			<!-- 底部 -->
			<Footer />
		</el-container>
	</el-container>
</template>

<style scoped lang="scss">
	@import './index.scss';
</style>
