<script setup lang="ts">
	import Logo from './components/Logo.vue'
	import { MenuStore } from '@/stores/modules/menu'
	import { storeToRefs } from 'pinia'
	// import { useRoute } from 'vue-router';
	const menuStore = MenuStore()
	const { isCollapse } = storeToRefs(menuStore)
	import { menuRoutes } from '@/router/routes'
	import SubItem from './components/SubItem.vue'
</script>

<template>
	<div class="menu" :style="{ width: isCollapse ? '65px' : '220px' }">
		<!-- logo组件 -->
		<Logo />
		<!-- 滚动条组件 -->
		<el-scrollbar>
			<!-- 菜单导航 -->
			<el-menu
				router
				:collapse="isCollapse"
				:collapse-transition="false"
				:default-active="$route.path"
				background-color="#191a20"
				text-color="#bdbdc0"
				active-text-color="#fff"
			>
				<SubItem :index="route.path" v-for="route in menuRoutes" :key="route.path" :item="route" />
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<style scoped lang="scss">
	@import './index.scss';
</style>
