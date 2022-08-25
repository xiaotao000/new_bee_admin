import { createApp } from 'vue'

import stores from '@/stores'
import App from './App.vue'
import router from './permission'
// 导入字体样式
import './assets/fonts/font.scss'
// 导入字体图标
import './assets/iconfont/iconfont.scss'
// 导入重置样式
import './styles/reset.scss'
// 导入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 导入ElementPlus中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 导入ElementPlusIcon
import * as Icons from '@element-plus/icons-vue'

// 导入公共样式
import './styles/common.scss'

const app = createApp(App)

// 注册ElementPlus图标
for (const [key, component] of Object.entries(Icons)) {
	app.component(key, component)
}

// 注册到vue中
app.use(ElementPlus, { locale: zhCn })
app.use(router)
app.use(stores)

app.mount('#app')
