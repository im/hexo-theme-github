<template>
    <div class="recent-posts">
        <div class="top">
            <span>Recent posts</span>
            <!-- <span>Popular repositories</span> -->
        </div>
        <el-row class="recent-posts-main">
            <el-col :span="12" :xs="24" v-for="post in posts" class="post-col">
                <div class="item">
                    <div class="box">
                        <!-- <a href="/" class="title">{{ post.title }}</a> -->
                        <router-link
                            :to="{
                                name: 'post',
                                params: { slug: post.slug },
                            }"
                            class="title"
                            tag="a"
                        >
                            {{ post.title }}
                        </router-link>
                        <div class="desc">
                            {{ post.text }}
                        </div>
                        <div class="secondary">secondary</div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { fetchPostsList } from '@/api'
export default defineComponent({
    name: 'RecentPosts',
    props: {},
    data() {
        return {
            posts: [],
        }
    },
    methods: {
        async fetchPostsList(page) {
            const list = await fetchPostsList(1)
            this.posts = list.data.splice(0, 6)
        },
    },
    mounted() {
        this.fetchPostsList(1)
    },
})
</script>

<style lang="stylus">
.recent-posts
    margin-top 24px
    padding 0 8px
    .top
        display:flex
        align-items center
        justify-content space-between
        font-size 16px
        margin-bottom 8px
        span:last-child
            color: var(--color-text-secondary)!important;
            font-size 12px
            cursor pointer
            &:hover
                color: var(--color-text-link)!important;
.recent-posts-main
    margin-right -8px
    margin-left -8px
    .post-col
        margin-bottom 16px
    .item
        padding-right: 8px!important;
        padding-left: 8px!important;
        height 100%
        .box
            height 100%
            background-color: var(--color-bg-primary);
            border: 1px solid var(--color-border-primary);
            border-radius: 6px;
            padding 16px
            display: flex;
            width: 100%;
            flex-direction: column;
        .title
            color: var(--color-text-link);
            font-weight bold
            &:hover
                color: var(--color-text-link);
                text-decoration: underline;
        .desc
            flex: 1 0 auto;
            font-size 12px
            color: var(--color-text-secondary)!important;
            margin-bottom 16px
            margin-top 8px
</style>
