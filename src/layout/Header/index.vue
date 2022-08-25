<script setup lang="ts" name="Header">
	import MenuCollapse from './components/MenuCollapse.vue'
	import Breadcrumb from './components/Breadcrumb.vue'
	import Size from './components/Size.vue'
	import FullScreen from './components/FullScreen.vue'
	import Avatar from './components/Avatar.vue'
	import { GlobalStore } from '@/stores'
</script>

<template>
	<div class="header">
		<div class="left-container flx-align-center">
			<MenuCollapse />
			<Breadcrumb />
		</div>
		<div class="right-container flx-align-center">
			<Size />
			<FullScreen />
			<span class="username">{{ GlobalStore().nickName }}</span>
			<Avatar />
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import './index.scss';
</style>
