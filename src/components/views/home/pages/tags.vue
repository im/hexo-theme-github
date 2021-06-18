<template>
    <div class="tags-main">
        <div v-if="slug">
            <div class="filter">
                <strong>{{ tag.count }}</strong> posts in tag
                <strong>{{ tag.name }}</strong>
            </div>
            <PostItem v-for="post in tag.postlist" :post="post"></PostItem>
        </div>
        <ul v-else>
            <li v-for="item in data" :key="item.slug">
                <router-link
                    tag="a"
                    :to="{
                        name: 'tags',
                        params: {
                            slug: item.slug,
                        },
                    }"
                    class="link"
                >
                    <span class="repo-language-color" :style="getStyle(item)"></span>
                    {{ item.name }} ({{ item.count }})
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import PostItem from 'components/tags/postItem.vue'
import { ref, defineComponent } from 'vue'
import { fetchAllTags, fetchTag } from '@/api'
import { getTagBgColor } from '@/utils'
export default defineComponent({
    name: 'tags',
    props: {},
    components: {
        PostItem,
    },
    data() {
        return {
            data: [],
            tag: {},
        }
    },
    computed: {
        slug() {
            return this.$route.params.slug
        },
    },
    watch: {
        slug() {
            this.init()
        },
    },
    methods: {
        getStyle(item) {
            return {
                'background-color': getTagBgColor(item.name),
            }
        },
        async fetchAllTags() {
            const data = await fetchAllTags()
            this.data = data
        },
        async fetchTag() {
            const tag = await fetchTag(this.slug)
            this.tag = tag
            console.log('list: ', tag)
        },
        init() {
            this.slug ? this.fetchTag() : this.fetchAllTags()
        },
    },
    mounted() {
        this.init()
    },
})
</script>
<style lang="stylus" scoped>
.tags-main
    margin-top: 24px;
    padding: 0 8px;
    ul
        list-style none
        position: relative;
        display flex
        flex-wrap: wrap;
        li
            line-height 26px
            margin 5px
        a
            display flex
            align-items center
            color: var(--color-text-secondary);
            &:hover
                color: var(--color-text-link);
                text-decoration: underline
        .repo-language-color
            top: 1px;
            display: inline-block;
            width: 12px;
            height: 12px;
            border: 1px solid var(--color-repo-language-color-border);
            border-radius: 50%;
            margin-right 5px
    .filter
        border-bottom: 1px solid var(--color-border-primary)!important;
        padding-bottom 24px
</style>
