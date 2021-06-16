<template>
    <header class="header">
        <div class="item hidden-xs-only">
            <a href="/" class="link">
                <i class="iconfont icon-huaban88 logo-icon"></i>
            </a>
        </div>
        <div class="item hidden-sm-and-up">
            <i class="iconfont icon-bar1"></i>
        </div>
        <div class="item item-full logo hidden-sm-and-up">
            <a href="/" class="link">
                <i class="iconfont icon-huaban88 logo-icon"></i>
            </a>
        </div>
        <div class="item item-full hidden-xs-only">
            <label class="search-wrapper" for="search-input">
                <input
                    placeholder="Search or jump to…"
                    class="search-input"
                    autocomplete="off"
                    id="search-input"
                />
                <i class="search-key-slash">/</i>
            </label>
            <nav>
                <a href="/" class="link">Pull requests</a>
                <a href="/" class="link">Issues</a>
                <a href="/" class="link">Marketplace</a>
                <a href="/" class="link">Explore</a>
            </nav>
        </div>
        <div class="item">
            <div class="icon-item">
                <i class="iconfont icon-tongzhi"></i>
                <div class="notification"></div>
            </div>
        </div>
        <div class="item hidden-xs-only">
            <div class="icon-item">
                <i class="iconfont icon-icon-add"></i>
                <span class="dropdown-caret"></span>
            </div>
        </div>
        <div class="item hidden-xs-only">
            <div class="avatars">
                <img
                    src="https://avatars.githubusercontent.com/u/12029165?s=60&v=4"
                />
                <span class="dropdown-caret"></span>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { ref, defineComponent, inject } from 'vue'
export default defineComponent({
    name: 'Head',
    props: {},
    setup: () => {
        const hexoConfig = inject('hexoConfig')
        return { hexoConfig }
    }
})
</script>

<style lang="stylus">
@import '../../style/tags/head.styl'
</style>
