<template>
    <div>{{count}}</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: 'Home',
    props: {
        msg: {
            type: String,
            required: true,
        },
    },
    setup: () => {
        const count = ref(0)
        return { count }
    },
})
</script>

<style scoped lang="stylus">
</style>
