<template>
    <div class="container">
        <div class="box">
            <div class="header">
                <div class="left">
                    <a href="/">{{ profile.nickname }}</a> posted on
                    {{ updated }}
                </div>
                <div class="right"></div>
            </div>
            <article
                v-html="data.content"
                class="markdown-body article"
            ></article>
            <div class="avatar-post">
                <a href="/">
                    <img :src="profile.avatar" />
                </a>
            </div>
        </div>
        <div class="prev-next">
            <div v-if="data.prev">
                <router-link
                    :to="{
                        name: 'post',
                        params: { slug: data.prev.slug },
                    }"
                    tag="a"
                >
                    <i class="iconfont icon-zuoxia-copy"></i>
                    {{ data.prev.title }}
                </router-link>
            </div>
            <div v-if="data.next">
                <router-link
                    :to="{
                        name: 'post',
                        params: { slug: data.next.slug },
                    }"
                    tag="a"
                >
                    {{ data.next.title }}
                    <i class="iconfont icon-zuojiantou-right"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, inject } from 'vue'
import { getRelativeTimeFromNow, format } from '@/utils/date'
export default defineComponent({
    name: 'content',
    props: ['data'],
    inject: ['hexo'],
    data() {
        return {
            themeConfig: this.hexo.themeConfig,
            hexoConfig: this.hexo.hexoConfig,
        }
    },
    computed: {
        profile() {
            return this.themeConfig.profile || {}
        },
        total() {
            return this.hexoConfig.total || {}
        },
        created() {
            return getRelativeTimeFromNow(this.data.date || new Date())
        },
        updated() {
            return format(this.data.date || new Date())
        },
    },
})
</script>

<style scoped lang="stylus">
.container
    margin-left 40px
    padding-left 16px
    .prev-next
        display flex
        align-items: center
        justify-content: space-between
        line-height 30px
        a
            color:var(--color-text-link)!important
            display flex
            align-items: center
            &:hover
                color:var(--color-text-link)!important
        .iconfont
            font-size 12px
            color: var(--color-text-primary)!important
            transform: scale(0.8);
            display: block;
    .header
        background-color: var(--color-box-bg-info);
        border-bottom: 1px solid var(--color-box-border-info);
        padding 8px 16px
        color: var(--color-text-secondary);
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        display flex
        align-items: center
        justify-content: space-between
        a
            font-weight 600
            font-size 12px
            color: var(--color-text-primary)!important
            &:hover
                color:var(--color-text-link)!important
                text-decoration: underline
    .article
        padding 15px
        weight 100%
    .avatar-post
        position: absolute;
        left: -55px;
        z-index: 1;
        top 0
        a
            display block
        img
            display: inline-block;
            overflow: hidden;
            line-height: 1;
            vertical-align: middle;
            background-color: var(--color-avatar-bg);
            border-radius: 6px;
            flex-shrink: 0;
            box-shadow: 0 0 0 1px var(--color-avatar-border);
            width 40px
            height 40px
    .box
        position: relative;
        // padding: 16px 0;
        // margin-left: 16px;
        color: var(--color-text-primary);
        background-color: var(--color-bg-primary);
        border: 1px solid var(--color-box-border-info);
        border-radius: 6px;

        &:before, &:after
            position: absolute;
            top: 11px;
            right: 100%;
            left: -8px;
            display: block;
            width: 8px;
            height: 16px;
            pointer-events: none;
            content: " ";
            -webkit-clip-path: polygon(0 50%,100% 0,100% 100%);
            clip-path: polygon(0 50%,100% 0,100% 100%);
            background-color: var(--color-box-border-info);
        &:after
            margin-left: 1px;
            background-color: var(--color-box-bg-info);
            background-image: linear-gradient(var(--color-current-user-tip-bg),var(--color-current-user-tip-bg));
</style>
