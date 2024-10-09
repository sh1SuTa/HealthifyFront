import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/dist/locale/zh-cn.js'

import App from './App.vue'
import router from './router'

// 创建 Pinia 实例
const pinia = createPinia();
const app = createApp(App)

// 使用持久化状态插件
pinia.use(createPersistedState());



// 挂载插件
app.use(pinia)
app.use(router)
app.use(ElementPlus, { locale });

app.mount('#app')
