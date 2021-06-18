<template>
    <div class="posts-main">
        <PostItem v-for="post in posts" :post="post"></PostItem>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { fetchPostsList } from '@/api'
import PostItem from 'components/tags/postItem.vue'
export default defineComponent({
    name: 'archives',
    props: {},
    components: {
        PostItem,
    },
    data() {
        return {
            posts: [],
        }
    },
    methods: {
        async fetchPostsList(page: any) {
            const list = await fetchPostsList(page)
            console.log('list: ', list);
            this.posts = list.data
        },
    },
    mounted() {
        this.fetchPostsList(1)
    },
})
</script>

<style lang="stylus" scoped>
.posts-main
    margin-top: 24px;
    padding: 0 8px;
</style>
