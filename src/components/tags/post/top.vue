<template>
    <div class="top">
        <h1>
            <span class="title">{{ data.title }}</span>
            <span class="tertiary">#{{data.sort}}</span>
        </h1>
        <span class="meta">Posted {{created}}</span>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, inject } from 'vue'
import { getRelativeTimeFromNow, format } from '@/utils/date'
export default defineComponent({
    name: 'top',
    props: ['data'],
    inject: ['hexo'],
    data() {
        return {
            themeConfig: this.hexo.themeConfig,
            hexoConfig: this.hexo.hexoConfig,
        }
    },
    computed: {
        created () {
            return getRelativeTimeFromNow(this.data.date || new Date())
        }
    }
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
