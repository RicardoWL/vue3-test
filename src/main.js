import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from "./store";
import './permission'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import {message} from 'ant-design-vue'

import ElementUI from 'element3'
import 'element3/lib/theme-chalk/index.css'

// import ElementUI from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'

import { createFromIconfontCN } from '@ant-design/icons-vue';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2167650_ysxq8pynxzs.js',
});

const app = createApp(App)

app.config.productionTip = false
app.config.globalProperties.$message = message

app.use(router)
app.use(store)
app.use(Antd)
app.use(ElementUI)
app.component('IconFont', IconFont)

router.isReady().then(() => {
  app.mount('#app')
})
