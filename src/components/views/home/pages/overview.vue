<template>
    <div>
        <RecentPosts v-if="!isLoading"></RecentPosts>

        <Calendar
            v-if="!isLoading"
            :allPost="allPost"
        ></Calendar>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import RecentPosts from 'components/tags/home/recentPosts.vue'
import Calendar from 'components/tags/home/calendar.vue'
import { fetchAllPost } from '@/api'

export default defineComponent({
    name: 'overview',
    props: {},
    components: {
        RecentPosts,
        Calendar,
    },
    data() {
        return {
            allPost: [],
            isLoading: true,
        }
    },
    methods: {
        async fetchAllPost() {
            this.$nprogress.start()
            this.isLoading = true
            const data = await fetchAllPost()
            console.log('data: ', data)
            this.allPost = data
            this.$nprogress.done(true)
            this.isLoading = false
        },
    },
    mounted() {
        this.fetchAllPost()
    },
})
</script>

<style lang="stylus"></style>
