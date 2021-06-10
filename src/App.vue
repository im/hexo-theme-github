<template>
    <div>
        <img alt="Vue logo" src="./assets/logo.png" />
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'App',
    components: {},
})
</script>
<style lang="stylus">
@import 'style/app'
</style>
