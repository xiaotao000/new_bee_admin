<script setup lang="ts">
	import { MenuStore } from '@/stores/modules/menu'
	import { storeToRefs } from 'pinia'
	const menuStore = MenuStore()
	const { isCollapse } = storeToRefs(menuStore)
</script>

<template>
	<div class="logo flx-center">
		<img src="https://pinia.vuejs.org/logo.svg" alt="" />
		<span v-show="!isCollapse">NB Admin</span>
	</div>
</template>

<style scoped lang="scss">
	// logo样式
	.logo {
		box-sizing: border-box;
		height: 55px;
		border-bottom: 1px solid #282a35;
		box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
		img {
			width: 24px;
			// 设置图片显示方式 填充
			object-fit: contain;
			margin-right: 8px;
		}
		span {
			font-size: 22px;
			font-weight: bold;
			color: #dadada;
			white-space: nowrap;
		}
	}
</style>
