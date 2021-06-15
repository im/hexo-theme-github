<template>
    <div>
        <div class="item" v-for="item in list" :class="item.split(' - ')[0]" :key="item">{{item}}</div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: 'Layout',
    props: {},
    setup: () => {
        const list = [
            'hidden-xs-only - 当视口在 xs 尺寸时隐藏 超小屏幕 手机 (<768px)	',
            'hidden-sm-only - 当视口在 sm 尺寸时隐藏 小屏幕 平板 (≥768px)	',
            'hidden-sm-and-down - 当视口在 sm 及以下尺寸时隐藏 小屏幕 平板 (≥768px)	',
            'hidden-sm-and-up - 当视口在 sm 及以上尺寸时隐藏',
            'hidden-md-only - 当视口在 md 尺寸时隐藏 中等屏幕 桌面显示器 (≥992px)',
            'hidden-md-and-down - 当视口在 md 及以下尺寸时隐藏',
            'hidden-md-and-up - 当视口在 md 及以上尺寸时隐藏',
            'hidden-lg-only - 当视口在 lg 尺寸时隐藏 大屏幕 大桌面显示器 (≥1200px)',
            'hidden-lg-and-down - 当视口在 lg 及以下尺寸时隐藏',
            'hidden-lg-and-up - 当视口在 lg 及以上尺寸时隐藏',
            'hidden-xl-only - 当视口在 xl 尺寸时隐藏',
        ]
        return { list }
    },
})
</script>

<style lang="stylus" scoped>
.item
    width calc(100% - 20px)
    height 40px
    background: #d3dce6;
    text-align center
    margin 10px
    line-height 40px
</style>
