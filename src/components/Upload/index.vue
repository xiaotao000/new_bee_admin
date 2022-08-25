<script setup lang="ts">
	import { GlobalStore } from '@/store'
	import { ElMessage } from 'element-plus'
	// Props接收
	defineProps<{ a: string }>()
	// Emit返回
	const Emit = defineEmits(['update:a'])

	// 图片上传成功
	const handleAvatarSuccess = response => {
		Emit('update:a', response.data)
	}

	// 上传图片前【拦截上传操作 return false】
	const beforeAvatarUpload = rawFile => {
		if (rawFile.type !== 'image/jpeg') {
			ElMessage.error('图片只能为JPG格式')
			return false
		} else if (rawFile.size / 1024 / 1024 > 2) {
			ElMessage.error('图片大小不能超过 2MB!')
			return false
		}
		return true
	}
</script>

<template>
	<!-- 上传组件 -->
	<el-upload
		class="avatar-uploader"
		action="/ys/upload/file"
		:headers="{ token: GlobalStore().token }"
		:show-file-list="false"
		:on-success="handleAvatarSuccess"
		:before-upload="beforeAvatarUpload"
	>
		<img v-if="a" :src="a" class="avatar" />
		<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
	</el-upload>
</template>

<style scoped lang="scss">
	.avatar-uploader {
		.avatar {
			width: 178px;
			height: 178px;
			display: block;
		}
		// :deep(选择器) 深度选择器
		:deep(.el-upload) {
			border: 1px dashed var(--el-border-color);
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
			transition: var(--el-transition-duration-fast);
			&:hover {
				border-color: var(--el-color-primary);
			}
		}
		:deep(.el-icon.avatar-uploader-icon) {
			font-size: 28px;
			color: #8c939d;
			width: 178px;
			height: 178px;
			text-align: center;
		}
	}
</style>
