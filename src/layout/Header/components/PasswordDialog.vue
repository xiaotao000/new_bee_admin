<script setup lang="ts">
	import { ref } from 'vue'

	let dialogVisible = ref(false)

	const openDialog = () => {
		dialogVisible.value = true
	}

	defineExpose({
		openDialog
	})
</script>

<template>
	<el-dialog v-model="dialogVisible" title="修改密码" width="30%">
		<span>121</span>
		<template #footer>
			<el-button @click="dialogVisible = false">取消</el-button>
			<el-button type="primary" @click="dialogVisible = false">确定</el-button>
		</template>
	</el-dialog>
</template>

<style scoped lang="scss"></style>
