export interface ResultType<T = any> {
	data: T
	message: string
	resultCode: number
}

export namespace UserAdmin {
	export interface LoginParams {
		userName: string
		passwordMd5: string
	}
}

export namespace config {
	export interface swiper {
		pageNumber: string | number
		pageSize: string | number
	}
}

export namespace categories {
	export interface categories {
		pageNumber: string | number
		pageSize: string | number
		categoryLevel: string | number
		parentId: string | number
	}
}

export namespace user {
	export interface user {
		pageNumber: string | number
		pageSize: string | number
		lockStatus: string
	}
}

export namespace goods {
	export interface goods {
		pageNumber: string | number
		pageSize: string | number
		goodsName: string
		goodsSellStatus: string | number
	}
}
