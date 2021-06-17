import { createApp } from 'vue'
import { ElButton, ElSelect, ElRow, ElCol, ElAutocomplete } from 'element-plus'
import App from './App.vue'
import router from './router'
import 'element-plus/lib/theme-chalk/display.css'
import 'style/base/nprogress.css'
import NProgress from 'nprogress'

const app = createApp(App)

const installNProgress = {
    install(app: any) {
        app.config.globalProperties.$nprogress = NProgress
    },
}
app.use(router)
app.use(installNProgress)
app.component(ElButton.name, ElButton)
app.component(ElAutocomplete.name, ElAutocomplete)
app.component(ElSelect.name, ElSelect)
app.component(ElRow.name, ElRow)
app.component(ElCol.name, ElCol)
app.mount('#app')
