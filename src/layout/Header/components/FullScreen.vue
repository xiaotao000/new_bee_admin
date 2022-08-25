<script setup lang="ts">
	import { useFullscreen } from '@vueuse/core'
	const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
	<el-tooltip effect="dark" :content="isFullscreen ? '退出全屏' : '进入全屏'" placement="bottom">
		<i class="icon-style iconfont" :class="isFullscreen ? 'icon-suoxiao' : 'icon-fangda'" @click="toggle"></i>
	</el-tooltip>
</template>

<style scoped lang="scss">
	@import '../index.scss';
</style>
