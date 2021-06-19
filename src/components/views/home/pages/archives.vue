<template>
    <div class="posts-main">
        <PostItem v-for="post in posts" :post="post"></PostItem>
        <div class="paginate-container">
            <div class="btn-group">
                <button
                    class="btn"
                    :disabled="previousDisabled"
                    @click="previous"
                >
                    Previous
                </button>
                <button class="btn" :disabled="nextDisabled" @click="next">
                    Next
                </button>
            </div>
        </div>
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
            page: 1,
            archives: {},
        }
    },
    computed: {
        previousDisabled() {
            return this.page <= 1
        },
        nextDisabled() {
            return this.page >= this.pageCount
        },
        pageCount() {
            return this.archives.pageCount
        },
    },
    methods: {
        previous() {
            this.page = this.page - 1
            this.fetchPostsList()
        },
        next() {
            this.page = this.page + 1
            this.fetchPostsList()
        },
        async fetchPostsList() {
            this.$nprogress.start()
            this.archives = await fetchPostsList(this.page)
            this.posts = this.archives.data
            this.$nprogress.done(true)
        },
    },
    mounted() {
        this.fetchPostsList()
    },
})
</script>

<style lang="stylus" scoped>
.posts-main
    margin-top: 24px;
    padding: 0 8px;
.paginate-container
    margin-top: 16px;
    margin-bottom: 16px;
    text-align: center;
    .btn-group
        display: inline-block;
        vertical-align: middle;
        .btn
            position: relative;
            display: inline-block;
            padding: 5px 16px;
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            white-space: nowrap;
            vertical-align: middle;
            cursor: pointer;
            user-select: none;
            border: 1px solid;
            border-radius: 6px;
            appearance: none;
            background-color: var(--color-btn-bg);
            border-color: var(--color-btn-border);
            box-shadow: var(--color-btn-shadow),var(--color-btn-inset-shadow);
            transition: .2s cubic-bezier(.3,0,.5,1);
            transition-property: color,background-color,border-color;
            color: var(--color-btn-outline-text);
            float: left;
            border-right-width: 0;
            border-radius: 0;
            &:disabled
                color: var(--color-btn-outline-disabled-text);
                background-color: var(--color-btn-outline-disabled-bg);
                border-color: var(--color-btn-border);
                box-shadow: none;
                cursor: default;
                pointer-events: none
                &:hover
                    color: var(--color-btn-outline-disabled-text);
                    background-color: var(--color-btn-outline-disabled-bg);
                    border-color: var(--color-btn-border);
                    box-shadow: none;
                    cursor: default;
            &:first-child
                border-top-left-radius: 6px;
                border-bottom-left-radius: 6px;
            &:last-child
                border-right-width: 1px;
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
            &:hover
                color: var(--color-btn-outline-hover-text);
                background-color: var(--color-btn-outline-hover-bg);
                border-color: var(--color-btn-outline-hover-border);
                box-shadow: var(--color-btn-outline-hover-shadow),var(--color-btn-outline-hover-inset-shadow);
</style>
