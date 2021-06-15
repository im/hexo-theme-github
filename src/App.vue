<template>
    <div data-color-mode="light">
        <Head></Head>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import Head from 'components/tags/Head.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App',
    components: { Head },
})
</script>
<style lang="stylus">
@import 'style/app'
</style>
