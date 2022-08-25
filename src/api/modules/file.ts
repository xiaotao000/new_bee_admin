import http from '../index'

// 获取轮播图
export const upload = data => {
	return http.post('/upload/file', data)
}
