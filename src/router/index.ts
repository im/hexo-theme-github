import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from 'components/views/HelloWorld.vue'
import Home from 'components/views/Home.vue'

const routerHistory = createWebHashHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/helloworld',
            component: HelloWorld,
        },
    ],
})

export default router
