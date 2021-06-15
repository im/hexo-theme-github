<template>
    <div>
        <RecentPosts></RecentPosts>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import RecentPosts from 'components/tags/home/recentPosts.vue'

export default defineComponent({
    name: 'overview',
    props: {},
    components: {
        RecentPosts,
    },
})
</script>

<style lang="stylus"></style>
