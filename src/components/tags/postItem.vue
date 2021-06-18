<template>
    <div class="post-item">
        <router-link
            tag="a"
            :to="{ name: 'post', params: { slug: post.slug } }"
            class="link"
        >
            <span>{{ post.title }}</span>
        </router-link>
        <div v-html="post.text" class="desc"></div>
        <div>
            <ul>
                <li v-for="item in post.tags" :key="item.slug">
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
                        <span
                            class="repo-language-color"
                            :style="getStyle(item)"
                        ></span>
                        {{ item.name }}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, inject } from 'vue'
import { getTagBgColor } from '@/utils'
export default defineComponent({
    name: 'postItem',
    props: ['post'],
    methods: {
        getStyle(item) {
            return {
                'background-color': getTagBgColor(item.name),
            }
        },
    },
    mounted() {},
})
</script>

<style lang="stylus" scoped>
.post-item
    border-bottom: 1px solid var(--color-border-primary)
    padding 24px 0
    &:last-child
        border-bottom: none
    .link
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--color-text-link);
        text-decoration: none;
        font-weight: 600;
        margin-bottom: 4px
        line-height: 30px
        &:hover
            text-decoration: underline
    .desc
        color: var(--color-text-secondary)!important;
        margin-bottom: 8px
    ul
        list-style none
        position: relative;
        display flex
        li
            line-height 26px
            display flex
            align-items: center
            margin-right 5px
            font-size 12px
        a
            display flex
            align-items center
            color: var(--color-text-secondary);
            font-size 12px
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
</style>
