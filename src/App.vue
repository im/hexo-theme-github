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
    setup() {
        let data = reactive({})
        provide('hexoConfig', data)
        return { data }
    },
    methods: {
        async fetchHexoConfig() {
            this.$nprogress.start()
            const data = await fetchHexoConfig()
            this.data = Object.assign(this.data, data)
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
