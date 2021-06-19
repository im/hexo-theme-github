<template>
    <main class="post-main">
        <Top :data="data"></Top>
        <el-row class="home-main">
            <el-col :span="24" :xs="24">
                <Content :data="data"></Content>
            </el-col>
            <!-- <el-col :span="6" :xs="24">
                <Sidebar></Sidebar>
            </el-col> -->
        </el-row>
    </main>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import Top from 'components/tags/post/top.vue'
import Content from 'components/tags/post/content.vue'
import Sidebar from 'components/tags/post/sidebar.vue'
import { fetchPostBySlug } from '@/api'
export default defineComponent({
    components: {
        Top,
        Content,
        Sidebar,
    },
    data() {
        return {
            data: {},
        }
    },
    watch: {
        '$route.params' () {
            this.getData()
        }
    },
    methods: {
        async getData() {
            this.$nprogress.start()
            const { slug } = this.$route.params
            const data = await fetchPostBySlug(slug)
            console.log('this.data: ', data)
            document.title = data.title
            this.data = data
            this.$nprogress.done()
        },
    },
    created() {
        this.getData()
    },
})
</script>

<style scoped lang="stylus">
.post-main
    padding 0 24px
    min-height 100%
</style>
