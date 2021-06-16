<template>
    <div class="container">
        <div class="box">
            <div class="header"></div>
            <article
                v-html="data.content"
                class="markdown-body article"
            ></article>
            <div class="avatar-post">
                <!-- <a href="/">
                    <img src="/avatar.png" />
                </a> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, inject } from 'vue'
export default defineComponent({
    name: 'content',
    props: ['data'],
    setup: () => {},
})
</script>

<style scoped lang="stylus">
.container
    margin-left 40px
    padding-left 16px
    .header
        background-color: var(--color-box-bg-info);
        border-bottom: 1px solid var(--color-box-border-info);
        display: flex;
        align-items: center;
        padding-right: 16px;
        padding-left: 16px;
        color: var(--color-text-secondary);
        flex-direction: row-reverse;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
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
