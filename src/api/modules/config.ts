import http from '../index'
import { config } from '../interface'

// 获取轮播图
export const getSwiper = (data: config.swiper) => {
	return http.get('/carousels', data)
}

// 删除
export const removeSwiper = data => {
	return http.delete('/carousels', data)
}

// 添加
export const addSwiperAndUpdate = data => {
	if (data.carouselId) {
		return http.put('/carousels', data)
	} else {
		return http.post('/carousels', data)
	}
}

// 热销
export const getConfigs = data => {
	return http.get('/indexConfigs', data)
}

// 添加热销
export const addHotAndUpdate = data => {
	if (data.configId) {
		return http.put('/indexConfigs', data)
	} else {
		return http.post('/indexConfigs', data)
	}
}

// 删除
export const removeConfigs = data => {
	return http.delete('/indexConfigs', data)
}
