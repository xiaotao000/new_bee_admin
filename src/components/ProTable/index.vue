<script setup lang="ts">
	import { ColumnProps } from './interface'
	import Pagination from '../Pagination/index.vue'
	import { useTable } from './hooks/useTable'
	import { ref } from 'vue'

	interface TableProps {
		columns: Partial<ColumnProps>[]
		requestApi: (params: any) => Promise<any>
		initParams?: any
	}
	const selectList = ref([])
	const { requestApi, initParams = {} } = defineProps<TableProps>()
	const { tableData, loading, pageable, getTableData, pageChange, sizeChange } = useTable(requestApi, initParams)
	defineExpose({
		refresh: getTableData,
		selectList
	})
</script>

<template>
	<div class="table-box">
		<div class="table-header">
			<div class="header-button-lf">
				<slot name="tableHeader" :list="selectList"></slot>
			</div>
			<div class="header-button-ri">
				<!-- 刷新 -->
				<el-button icon="Refresh" circle @click="getTableData"> </el-button>
			</div>
		</div>
		<el-table v-loading="loading" :data="tableData" @selection-change="selectList = $event">
			<template v-for="item in columns" :key="item.label">
				<el-table-column
					v-if="item.type === 'index' || item.type === 'selection'"
					:type="item.type"
					:label="item.label"
					:prop="item.prop"
					:width="item.width"
				/>
				<el-table-column
					v-else-if="item.type === 'expand'"
					:type="item.type"
					:label="item.label"
					:prop="item.prop"
					:width="item.width"
					v-slot="{ row, $index }"
				>
					<slot :name="item.type" :row="row" :index="$index"></slot>
				</el-table-column>
				<el-table-column v-else :label="item.label" :prop="item.prop" :width="item.width" show-overflow-tooltip>
					<template #default="{ row }">
						<slot :name="item.prop" :row="row">
							<el-image
								v-if="item.image"
								:src="row[item.prop]"
								class="table-image"
								fit="cover"
								:preview-src-list="[row[item.prop]]"
								preview-teleported
								hide-on-click-modal
							/>
							<el-link v-else-if="item.link" target="_blank" type="primary" :href="row[item.prop]">{{ row[item.prop] }}</el-link>
							<el-tag v-else-if="item.tag" type="success">{{ row[item.prop] }}</el-tag>
							<span v-else>{{ row[item.prop] }}</span>
						</slot>
					</template>
				</el-table-column>
			</template>
		</el-table>
		<Pagination :pageable="pageable" @page-change="pageChange" @size-change="sizeChange" />
	</div>
</template>

<style scoped lang="scss">
	@import './index.scss';
</style>
