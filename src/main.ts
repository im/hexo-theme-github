import { createApp } from 'vue'
import { ElButton, ElSelect, ElRow, ElCol } from 'element-plus'
import App from './App.vue'
import router from './router'
import 'element-plus/lib/theme-chalk/display.css'

const app = createApp(App)

app.use(router)
app.component(ElButton.name, ElButton)
app.component(ElSelect.name, ElSelect)
app.component(ElRow.name, ElRow)
app.component(ElCol.name, ElCol)
app.mount('#app')
