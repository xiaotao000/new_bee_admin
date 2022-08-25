// * 封装Axios
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { ResultType } from './interface'
import { GlobalStore } from '@/stores'
import router from '@/router'
// * Axios配置
const axiosConfig: AxiosRequestConfig = {
	// 默认请求地址
	baseURL: '/api',
	// 设置请求超时时间
	timeout: 5000,
	// 跨域是否携带Cookie 【根据项目需求配置】
	withCredentials: false,
	// 配置请求头
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/json'
	}
}

// * Axios请求类
class HttpRequest {
	// axios实例
	service: AxiosInstance
	// 构造函数
	constructor(config) {
		// 创建axios实例
		this.service = axios.create(config)
		// * 请求拦截器
		// 客户端请求  -> 【请求拦截器】 ->  服务器接收请求
		this.service.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				config.headers['token'] = GlobalStore().token
				return config
			},
			(error: AxiosError) => Promise.reject(error)
		)
		// * 响应拦截器
		// 服务器响应  ->  【响应拦截器】 -> 客户端JS接收
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data } = response
				if (typeof data !== 'object') {
					return Promise.reject('请求错误')
				}
				if (data.resultCode !== 200) {
					ElMessage.error('错误！！！')
					if (data.resultCode === 419) {
						// * 清空token
						GlobalStore().eliminate()
						// * 跳转到登录
						router.push({ name: 'login' })
					}
					return Promise.reject(data.message)
				}
				return data
			},
			(error: AxiosError) => Promise.reject(error)
		)
	}
	// * get方法
	get<T = any>(url: string, params?: object, config: AxiosRequestConfig = {}): Promise<ResultType<T>> {
		return this.service.get(url, { params, ...config })
	}
	// * post方法
	post<T = any>(url: string, params?: object, config: AxiosRequestConfig = {}): Promise<ResultType<T>> {
		return this.service.post(url, params, config)
	}
	// * put方法
	put<T = any>(url: string, params?: object, config: AxiosRequestConfig = {}): Promise<ResultType<T>> {
		return this.service.put(url, params, config)
	}
	// * delete方法
	delete<T = any>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<ResultType<T>> {
		return this.service.delete(url, { data, ...config })
	}
}

export default new HttpRequest(axiosConfig)
