<template>
    <div class="categories-main">
        <div v-if="slug">
            <div class="filter">
                <strong>{{categorie.count}}</strong> posts in category <strong>{{categorie.name}}</strong>
            </div>
            <PostItem v-for="post in categorie.postlist" :post="post"></PostItem>
        </div>
        <ul v-else>
            <li v-for="cate in data" :key="cate.slug">
                <router-link
                    tag="a"
                    :to="{
                        name: 'categories',
                        params: {
                            slug: cate.slug,
                        },
                    }"
                    class="link"
                >
                    <span class="repo-language-color"></span>
                    {{ cate.name }} ({{ cate.count }})
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import PostItem from 'components/tags/postItem.vue'
import { ref, defineComponent } from 'vue'
import { fetchAllCategories, fetchCategorie } from '@/api'
export default defineComponent({
    name: 'categories',
    props: {},
    components: {
        PostItem
    },
    data() {
        return {
            data: [],
            categorie: {}
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
        async fetchAllCategories() {
            const data = await fetchAllCategories()
            console.log('data: ', data)
            this.data = data
        },
        async fetchCategorie() {
            const categorie = await fetchCategorie(this.slug)
            this.categorie = categorie
            console.log('list: ', categorie)
        },
        init() {
            this.slug ? this.fetchCategorie() : this.fetchAllCategories()
        },
    },
    mounted() {
        this.init()
    },
})
</script>

<style lang="stylus" scoped>
.categories-main
    margin-top: 24px;
    padding: 0 8px;
    ul
        list-style none
        position: relative;
        li
            line-height 26px
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
