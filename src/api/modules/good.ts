import http from '../index'
import { goods } from '../interface'

// 获取轮播图
export const getGoods = (data: goods.goods) => {
	return http.get('/goods/list', data)
}

// 修改上架下架
export const updateStatus = data => {
	return http.put(`/goods/status/${data.sellStatus}`, data.data)
}

// 获取商品分类
export const getCategories = data => {
	return http.get('/categories', data)
}

// 获取商品分类
export const updateAndAddGoods = data => {
	if (data.goodsId) {
		return http.put('/goods', data)
	} else {
		return http.post('/goods', data)
	}
}

export const getGood = goodsId => {
	return http.get(`/goods/${goodsId}`)
}
