<template>
    <el-row class="line-nav">
        <el-col :span="6" class="hidden-xs-only"></el-col>
        <el-col :span="18" class="hidden-xs-only">
            <nav>
                <a href="/#/overview" :class="setClass('overview')"
                    ><i class="iconfont icon-study"></i> Overview</a
                >
                <a href="/#/archives" :class="setClass('archives')"
                    ><i class="iconfont icon-repo"></i> Archives
                    <span class="counter">90</span></a
                >
                <a href="/#/categories" :class="setClass('categories')"
                    ><i class="iconfont icon-wenjianjia"></i> Categories</a
                >
                <a href="/#/tags" :class="setClass('tags')"
                    ><i class="iconfont icon-tags"></i> Tags</a
                >
            </nav>
        </el-col>
        <el-col :span="18" class="hidden-sm-and-up">
            <nav>
                <a href="/#/overview" :class="setClass('overview')"
                    ><i class="iconfont icon-study"></i> Overview</a
                >
                <a href="/#/archives" :class="setClass('archives')"
                    ><i class="iconfont icon-repo"></i> Archives
                    <span class="counter">90</span></a
                >
                <a href="/#/categories" :class="setClass('categories')"
                    ><i class="iconfont icon-wenjianjia"></i> Categories</a
                >
                <a href="/#/tags" :class="setClass('tags')"
                    ><i class="iconfont icon-tags"></i> Tags</a
                >
            </nav>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: 'underlineNav',
    props: {},
    computed: {
        routeName() {
            return this.$route.name
        },
    },
    methods: {
        setClass(val: string) {
            return {
                selected: this.routeName === val,
            }
        },
    },
})
</script>

<style lang="stylus" scoped>
.line-nav
    margin-top 24px
    padding 0 24px
    border-bottom: 1px solid var(--color-border-primary)!important;
    position: sticky!important;
    top 0
    z-index 3
    background-color: var(--color-bg-primary)!important;
.hidden-sm-and-up
    .line-nav
        margin-top 0
        padding 0
        nav
            a
                padding  8px
                .counter
                    display none
nav
    display flex
    padding 0 8px
    a
        padding: 8px 16px;
        font-size: 14px;
        line-height: 30px;
        color: var(--color-underlinenav-text);
        text-align: center;
        background-color: transparent;
        border: 0;
        border-bottom: 2px solid transparent;
        display flex
        align-items center
        &:hover
            color: var(--color-underlinenav-text-hover);
            text-decoration: none;
            border-bottom-color: var(--color-border-tertiary);
            outline: 1px dotted transparent;
            outline-offset: -1px;
            transition: border-bottom-color .12s ease-out;
        .counter
            min-width: 20px;
            padding: 0 6px;
            font-size: 12px;
            font-weight: 500;
            line-height: 18px;
            text-align: center;
            border: 1px solid transparent;
            border-radius: 2em;
            margin-left: 4px;
            color: var(--color-underlinenav-counter-text);
            background-color: var(--color-underlinenav-counter-bg);
        .iconfont
            color: var(--color-underlinenav-icon);
            margin-right 4px
            font-size:16px
        &.selected
            font-weight: 600;
            color: var(--color-underlinenav-text-active);
            border-bottom-color: #f9826c;
            outline: 1px dotted transparent;
            outline-offset: -1px;
            .iconfont
                color: inherit;
</style>
