import NProgress from 'nprogress'
import '@/styles/nprogress.scss'
export const installNProgress = {
    install(Vue: any) {
        Vue.prototype.$nprogress = NProgress
    },
}
