<template>
    <div data-color-mode="light">
        <Head></Head>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Head from 'components/tags/head.vue'
import { fetchHexoConfig } from '@/api'
import { defineComponent, reactive, provide } from 'vue'

export default defineComponent({
    name: 'App',
    components: { Head },
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
    // setup() {
    //     const hexoConfig = reactive({})
    //     const themeConfig = reactive({})
    //     provide('hexoConfig', hexoConfig)
    //     provide('themeConfig', themeConfig)
    //     return { hexoConfig, themeConfig }
    // },
    methods: {
        async fetchHexoConfig() {
            this.$nprogress.start()
            const hexoConfig = await fetchHexoConfig()
            console.log('hexoConfig: ', hexoConfig);
            this.hexo.hexoConfig = Object.assign(this.hexo.hexoConfig, hexoConfig)
            this.hexo.themeConfig = Object.assign(
                this.hexo.themeConfig,
                hexoConfig.theme_config
            )
            this.$nprogress.done()
        },
    },
    mounted() {
        this.fetchHexoConfig()
    },
})
</script>
<style lang="stylus">
@import 'style/app'
</style>
