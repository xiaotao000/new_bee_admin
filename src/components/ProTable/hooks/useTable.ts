import { ElMessage } from 'element-plus'
import { onMounted, reactive, toRefs } from 'vue'

export const useTable = (requestApi: (params: any) => Promise<any>, initParams: object = {}) => {
	const state = reactive({
		// 表格数据
		tableData: [],
		// 表格加载状态
		loading: false,
		pageable: {
			pageNumber: 1,
			pageSize: 10,
			total: 0
		}
	})
	// 获取信息
	const getTableData = async () => {
		state.loading = true
		const totalParam = { ...initParams, ...state.pageable }
		const {
			data: { list, totalCount, currPage, pageSize }
		} = await requestApi(totalParam)
		state.loading = false
		state.tableData = list
		state.pageable.pageNumber = currPage
		state.pageable.pageSize = pageSize
		state.pageable.total = totalCount
		try {
		} catch (error) {
			state.loading = false
			ElMessage.error('接口异常, 未知错误')
			console.log(error)
		}
	}
	onMounted(() => {
		getTableData()
	})
	const pageChange = (page: number) => {
		state.pageable.pageNumber = page
		getTableData()
	}

	// * 每页条数改变
	const sizeChange = (size: number) => {
		state.pageable.pageNumber = 1
		state.pageable.pageSize = size
		getTableData()
	}
	return {
		...toRefs(state),
		getTableData,
		pageChange,
		sizeChange
	}
}
