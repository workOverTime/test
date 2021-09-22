import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElMessage } from 'element-plus'
// app.config.globalProperties.$message = ElementPlus.ElMessage
let app = createApp(App)
app.config.globalProperties.$message = ElMessage
app.use(store).use(router).use(ElementPlus).mount('#app')


