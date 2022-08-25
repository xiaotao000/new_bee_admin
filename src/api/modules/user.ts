import http from '../index'
import { UserAdmin } from '../interface'

// 登入
export const loginApi = (data: UserAdmin.LoginParams) => {
	return http.post('adminUser/login', data)
}

// 退出登入
export const outLogin = () => {
	return http.delete('logout')
}

// 获取用户信息
export const getInfo = () => {
	return http.get('adminUser/profile')
}
