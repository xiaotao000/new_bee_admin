import http from '../index'
import { categories, user } from '../interface'

// 分类
export const getCategories = (data: categories.categories) => {
	return http.get('/categories', data)
}

// 添加和修改
export const addAndUpdate = data => {
	if (data.categoryId) {
		return http.put('/categories', data)
	} else {
		return http.post('/categories', data)
	}
}

// 删除
export const removeCategories = data => {
	return http.delete('/categories', data)
}

// 获取会员列表
export const getUser = (data: user.user) => {
	return http.get('/users', data)
}

// 修改禁用会员
export const updateUser = data => {
	return http.put(`/users/${data.lockStatus}`, data)
}

// 获取订单列表
export const getOrders = data => {
	return http.get('/orders', data)
}

export const getOrderDetails = data => {
	return http.get(`/orders/${data}`)
}

// 修改配送成功
export const updateCheckDone = data => {
	return http.put('/orders/checkDone', data)
}

// 修改订单已出货
export const updateCheckOut = data => {
	return http.put('/orders/checkOut', data)
}

// 修改订单取消订单
export const updateClose = data => {
	return http.put('/orders/close', data)
}
