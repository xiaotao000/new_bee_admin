<script setup lang="ts" name="RichText">
	/** Props属性接口*/
	import { upload } from '@/api/modules/file'
	import { onMounted } from 'vue'
	import tinymce from 'tinymce/tinymce'
	import 'tinymce/models/dom' // 特别注意 tinymce 6.0.0 版本之后必须引入，否则不显示
	import 'tinymce/themes/silver/theme'
	import Editor from '@tinymce/tinymce-vue' // 引入组件
	import 'tinymce/icons/default'
	import 'tinymce/plugins/image'
	import 'tinymce/plugins/link'
	import 'tinymce/plugins/code'
	import 'tinymce/plugins/table'
	import 'tinymce/plugins/lists'
	import 'tinymce/plugins/wordcount'

	const { modelValue } = defineProps<{
		modelValue: string
	}>()
	/** Event事件接口*/
	const emit = defineEmits<{
		(e: 'update:modelValue', value: string)
	}>()
	// 都是富文本插件
	// 以上所有的样式在 node_modules 下面 tinymce 里面的 plugins 都能找到。
	const init = {
		//初始化数据
		language_url: '/tinymce/langs/zh-Hans.js', // 引入语言包（该语言包在public下，注意文件名称）
		language: 'zh-Hans', // 这里名称根据 zh-Hans.js 里面写的名称而定
		skin_url: '/tinymce/skins/ui/oxide', // 这里引入的样式
		height: 300, // 限制高度
		plugins: 'link lists image code table wordcount', // 富文本插件
		toolbar:
			'bold italic underltinymceine strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
		branding: false, //是否禁用“Powered by TinyMCE”
		menubar: true, //顶部菜单栏显示
		// paste_convert_word_fake_lists: false, // 插入word文档需要该属性
		content_css: '/tinymce/skins/content/default/content.css', //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
		images_upload_handler: blobInfo =>
			new Promise((resolve, reject) => {
				// 上传图片需要，FormData 格式的文件；
				const formDataUp = new FormData()
				// img  是接口需要的上传的属性名，一般属性名是 file
				formDataUp.append('file', blobInfo.blob())
				upload(formDataUp)
					.then(e => {
						resolve(e.data)
					})
					.catch(e => {
						reject(e)
					})
			})
	}
	onMounted(() => {
		tinymce.init({}) // 初始化富文本
	})
</script>
<template>
	<div class="app-container">
		<editor id="tinymce" :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)" :init="init"></editor>
	</div>
</template>

<style scoped lang="scss">
	.app-container {
		width: 100%;
	}
</style>
