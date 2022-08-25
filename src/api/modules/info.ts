import http from '../index'

// 修改昵称
export const updateName = data => {
	return http.put('/adminUser/name', data)
}

export const updatePassword = data => {
	return http.put('/adminUser/password', data)
}
