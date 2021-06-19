<template>
    <div class="app-main" data-color-mode="light">
        <Head></Head>
        <router-view></router-view>
        <Foot></Foot>
    </div>
</template>

<script lang="ts">
import Head from 'components/tags/head.vue'
import Foot from 'components/tags/footer.vue'
import { fetchHexoConfig } from '@/api'
import { defineComponent, reactive, provide } from 'vue'

export default defineComponent({
    name: 'App',
    components: { Head, Foot },
    provide() {
        return {
            hexo: this.hexo,
        }
    },
    data() {
        return {
            hexo: {
                themeConfig: {},
                hexoConfig: {},
            },
        }
    },
    methods: {
        async fetchHexoConfig() {
            this.$nprogress.start()
            const hexoConfig = await fetchHexoConfig()
            console.log('hexoConfig: ', hexoConfig)
            this.hexo.hexoConfig = Object.assign(
                this.hexo.hexoConfig,
                hexoConfig
            )
            this.hexo.themeConfig = Object.assign(
                this.hexo.themeConfig,
                hexoConfig.theme_config
            )
            this.init()
            this.$nprogress.done(true)
        },
        init() {
            document.title = this.hexo.hexoConfig.title
            const { favicon, profile } = this.hexo.themeConfig.favicon
            if (favicon) {
                document
                    .querySelector('link[rel=icon]')
                    .setAttribute('href', favicon || profile.avatar)
            }
        },
    },
    mounted() {
        this.fetchHexoConfig()
    },
})
</script>
<style lang="stylus">
@import 'style/app'
#app, .app-main
    height 100%
</style>
