import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Layout from 'components/views/layout.vue'
import Home from 'components/views/home/index.vue'
import Overview from 'components/views/home/pages/overview.vue'
import Archives from 'components/views/home/pages/archives.vue'
import Tags from 'components/views/home/pages/tags.vue'
import Categories from 'components/views/home/pages/categories.vue'
import Post from 'components/views/post/index.vue'

const routerHistory = createWebHashHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            component: Home,
            name: 'home',
            redirect: '/overview',
            children: [
                {
                    path: 'overview',
                    name: 'overview',
                    component: Overview,
                },
                {
                    path: 'archives',
                    name: 'archives',
                    component: Archives,
                },
                {
                    path: 'tags/:slug?',
                    name: 'tags',
                    component: Tags,
                },
                {
                    path: 'categories/:slug?',
                    name: 'categories',
                    component: Categories,
                },
            ],
        },
        {
            path: '/layout',
            component: Layout,
        },
        {
            path: '/post/:slug',
            name: 'post',
            component: Post,
        },
    ],
})

export default router
