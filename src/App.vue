<script setup lang="ts">
	import { GlobalStore } from '@/stores'
	import { storeToRefs } from 'pinia'
	const globalStore = GlobalStore()
	const { storeSize } = storeToRefs(globalStore)
</script>

<template>
	<el-config-provider :size="storeSize">
		<router-view></router-view>
	</el-config-provider>
</template>

<style scoped lang="scss"></style>
