<template>
    <div class="recent-posts">
        <div class="top">
            <span>Popular repositories</span>
            <span>Popular repositories</span>
        </div>
        <el-row class="recent-posts-main">
            <el-col :span="12" :xs="24" v-for="i in 6">
                <div class="item">
                    <div class="box">
                        <a href="/" class="title"> vuepress-github-actions</a>
                        <div class="desc">
                            使用github actions 部署 GitHub pages
                        </div>
                        <div class="desc">secondary</div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: 'RecentPosts',
    props: {},
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
    .item
        padding-right: 8px!important;
        padding-left: 8px!important;
        margin-bottom 16px
        .box
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
