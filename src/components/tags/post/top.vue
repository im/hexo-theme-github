<template>
    <div class="top">
        <h1>
            <span class="title">{{ data.title }}</span>
            <span class="tertiary">#000xx</span>
        </h1>
        <span class="meta">opened this issue 29 days ago · 1 comment</span>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, inject } from 'vue'
export default defineComponent({
    name: 'top',
    props: ['data'],
    setup: () => {},
})
</script>

<style lang="stylus" scoped>
.top
    border-bottom: 1px solid var(--color-border-primary);
    padding 40px 0 20px 0
    margin-bottom 16px
h1
    margin-bottom 5px
    .title
        font-weight: 400;
        line-height: 1.125;
        word-wrap: break-word;
        font-size: 32px
        margin-right 5px
    .tertiary
        color: var(--color-text-tertiary)!important;
        font-weight: 300;
.meta
    padding-bottom: 8px;
    margin-top: 8px;
    font-size: 14px;
    color: var(--color-text-secondary);
</style>
