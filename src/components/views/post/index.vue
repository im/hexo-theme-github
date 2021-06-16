<template>
    <main class="post-main">
        <Top :data="data"></Top>
        <el-row class="home-main">
            <el-col :span="18" :xs="24">
                <Content :data="data"></Content>
            </el-col>
            <el-col :span="6" :xs="24">
                <Sidebar></Sidebar> 
            </el-col>
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
    async created() {
        this.$nprogress.start()
        const { slug } = this.$route.params
        this.data = await fetchPostBySlug(slug)
        this.$nprogress.done()
    },
})
</script>

<style scoped lang="stylus">
.post-main
    padding 0 24px
</style>
