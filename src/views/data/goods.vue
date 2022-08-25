<script setup lang="ts" name="addGoods">
	import { computed, onMounted, reactive, ref } from 'vue'
	import { getCategories, getGood } from '@/api/modules/good'
	import { GlobalStore } from '@/stores'
	import { UploadProps, ElMessage, type FormRules, type FormInstance } from 'element-plus'
	import RichText from '@/RichText.vue'
	import { updateAndAddGoods } from '@/api/modules/good'
	import { useRouter } from 'vue-router'
	let goodForm = reactive<any>({
		goods: {
			goodsCategoryId: [], // 商品分类
			goodsCoverImg: '', // 商品主图
			goodsDetailContent: '', // 内容详情
			goodsIntro: '', // 商品简介
			goodsName: '', // 商品名称
			goodsSellStatus: 0, // 上架状态
			originalPrice: '', // 商品价格
			sellingPrice: '', // 商品售卖价
			stockNum: '', // 商品库存
			tag: '', // 商品标签
			goodsId: ''
		}
	})
	const goodRules = ref<FormRules>({
		goodsCategoryId: [{ required: true, message: '请选择商品分类' }],
		goodsName: [{ required: true, message: '请输入商品名称' }],
		goodsIntro: [{ required: true, message: '请输入商品简介' }],
		originalPrice: [{ required: true, message: '请输入商品价格' }],
		sellingPrice: [{ required: true, message: '请输入商品售卖价' }],
		stockNum: [{ required: true, message: '请输入商品库存' }],
		tag: [{ required: true, message: '请输入商品商品标签' }],
		goodsSellStatus: [{ required: true, message: '请选择上架状态' }],
		goodsCoverImg: [{ required: true, message: '请选择商品主图' }]
	})
	const router = useRouter()
	const goodsFormRef = ref<FormInstance>()
	const props = {
		lazy: true,
		lazyLoad(node, resolve) {
			const {
				level,
				data: { value }
			} = node
			getCategories({
				pageNumber: 1,
				pageSize: 1000,
				categoryLevel: level + 1,
				parentId: value || 0
			}).then(res => {
				const nodes = res.data.list.map(item => ({
					value: item.categoryId,
					label: item.categoryName,
					leaf: level >= 2
				}))
				resolve(nodes)
			})
		}
	}
	const headers = computed(() => ({ token: GlobalStore().token }))
	const beforeAvatarUpload: UploadProps['beforeUpload'] = rawFile => {
		if (rawFile.type !== 'image/jpeg') {
			ElMessage.error('图片格式只能为JPG')
			return false
		} else if (rawFile.size / 1024 / 1024 > 2) {
			ElMessage.error('图片大小不能大于2MB')
			return false
		}
		return true
	}
	const handleAvatarSuccess: UploadProps['onSuccess'] = response => {
		const { data } = response
		goodForm.goods.goodsCoverImg = data
	}
	const submitForm = async () => {
		try {
			await goodsFormRef.value?.validate()
			await updateAndAddGoods({ ...goodForm.goods, goodsCategoryId: goodForm.goods.goodsCategoryId[2] })
			ElMessage.success(goodForm.goods.goodsId ? '修改商品成功！！' : '新增商品成功！')
			router.push('/module/goods')
		} catch (error) {
			console.log('取消')
		}
	}
	onMounted(() => {
		update()
	})
	const update = async () => {
		goodForm.goods.goodsId = router.currentRoute.value.query.goodsId
		if (!goodForm.goods.goodsId) return
		const {
			data: { goods }
		} = await getGood(goodForm.goods.goodsId)
		goodForm.goods = { ...goods }
	}
</script>

<template>
	<el-form ref="goodsFormRef" :rules="goodRules" :model="goodForm.goods" status-icon label-width="120px" class="demo-ruleForm">
		<el-form-item label="商品分类" prop="goodsCategoryId" style="width: 400px">
			<el-cascader v-model="goodForm.goods.goodsCategoryId" placeholder="请选择商品分类" :props="props" style="width: 400px" />
		</el-form-item>
		<el-form-item label="商品名称" prop="goodsName">
			<el-input v-model="goodForm.goods.goodsName" placeholder="请输入商品名称" />
		</el-form-item>
		<el-form-item label="商品简介" prop="goodsIntro">
			<el-input v-model="goodForm.goods.goodsIntro" type="textarea" placeholder="请选择商品简介（200字）" />
		</el-form-item>
		<el-form-item label="商品价格" prop="originalPrice">
			<el-input v-model="goodForm.goods.originalPrice" placeholder="请输入商品价格" />
		</el-form-item>
		<el-form-item label="商品售卖价" prop="sellingPrice">
			<el-input v-model="goodForm.goods.sellingPrice" placeholder="请输入商品售卖价" />
		</el-form-item>
		<el-form-item label="商品库存" prop="stockNum">
			<el-input v-model="goodForm.goods.stockNum" placeholder="请输入商品库存" />
		</el-form-item>
		<el-form-item label="商品标签" prop="tag">
			<el-input v-model="goodForm.goods.tag" placeholder="请输入商品商品标签" />
		</el-form-item>
		<el-form-item label="上架状态" prop="goodsSellStatus">
			<el-radio-group v-model="goodForm.goods.goodsSellStatus">
				<el-radio :label="0">上架</el-radio>
				<el-radio :label="1">下架</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="商品主图" prop="goodsCoverImg">
			<el-upload
				class="avatar-uploader"
				:headers="headers"
				action="http://zhi.zeng.pub/new-bee/manage-api/v1/upload/file"
				:show-file-list="false"
				:on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload"
			>
				<img v-if="goodForm.goods.goodsCoverImg" :src="goodForm.goods.goodsCoverImg" class="avatar" />
				<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
			</el-upload>
		</el-form-item>
		<el-form-item label="内容详情" style="width: 100%">
			<RichText v-model="goodForm.goods.goodsDetailContent" />
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm">{{ goodForm.goods.goodsId ? '立即修改' : '立即创建' }}</el-button>
		</el-form-item>
	</el-form>
</template>

<style scoped lang="scss">
	.el-form-item {
		width: 400px;
	}

	.avatar-uploader .avatar {
		width: 100px;
		height: 100px;
		display: block;
	}
	.avatar-uploader,
	.el-upload {
		border: 1px solid var(--el-border-color);
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		transition: var(--el-transition-duration-fast);
	}

	.avatar-uploader .el-upload:hover {
		border-color: var(--el-color-primary);
	}

	.el-icon.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		text-align: center;
	}
</style>
