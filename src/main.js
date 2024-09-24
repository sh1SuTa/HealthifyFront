const app = createApp(App)

import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/dist/locale/zh-cn.js'
app.use(ElementPlus,{locale});

import App from './App.vue'
import router from './router'



app.use(createPinia())
app.use(router)


app.mount('#app')
