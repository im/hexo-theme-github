<template>
    <div class="profile">
        <div class="user-info">
            <el-row class="home-main">
                <el-col :span="24" :xs="5">
                    <div
                        class="tooltipped tooltipped-s"
                        aria-label="Change your avatar"
                    >
                        <img class="avatar" :src="profile.avatar" />
                    </div>
                </el-col>
                <el-col :span="24" :xs="19">
                    <div class="name">
                        <h1>
                            <span class="fullname">{{ profile.nickname }}</span>
                            <span class="username">{{ profile.username }}</span>
                        </h1>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="detail">
            <div class="note" v-html="profile.description"></div>
            <div class="secondary">
                <a href="/" class="link">
                    <i class="iconfont icon-repo"></i>
                    <span>{{ total.posts }}</span>
                    posts
                </a>
                <i class="dot">·</i>
                <a href="/" class="link">
                    <i class="iconfont icon-wenjianjia"></i>
                    <span>{{ total.categories }}</span>
                    categories
                </a>
                <i class="dot">·</i>
                <a href="/" class="link">
                    <i class="iconfont icon-tags"></i>
                    <span>{{ total.tags }}</span>
                    tags
                </a>
            </div>
            <ul>
                <li v-if="profile.location">
                    <i class="iconfont icon-zuzhi1"></i>
                    {{ profile.location }}
                </li>
                <li v-if="profile.organization">
                    <i class="iconfont icon-location1"></i>
                    {{ profile.organization }}
                </li>
                <li v-if="profile.email">
                    <i class="iconfont icon-mail"></i>
                    {{ profile.email }}
                </li>
                <li v-if="profile.link">
                    <i class="iconfont icon-link"></i>
                    <a :href="profile.link" target="_blank" class="link">{{
                        profile.link
                    }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, inject } from 'vue'
export default defineComponent({
    name: 'Profile',
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
    },
})
</script>

<style lang="stylus">
.profile
    padding 0 8px
    margin-top -32px
    z-index 4
    position: relative
@media only screen and (max-width: 768px)
    .profile
        margin-top 0
    .user-info
        margin-bottom 24px
    .name
        margin-left 10px
.avatar
    display: inline-block;
    overflow: hidden;
    line-height: 1;
    vertical-align: middle;
    background-color: var(--color-avatar-bg);
    border-radius: 6px;
    flex-shrink: 0;
    box-shadow: 0 0 0 1px var(--color-avatar-border);
    border-radius: 50%!important;
    border: 1px solid var(--color-border-primary)!important;
    width 100%
    height auto
    aspect-ratio: auto 260 / 260;
    // min-height:260px
    // min-width:260px
.names {
    line-height: 1;
}
.fullname {
    font-size: 26px;
    line-height: 1.25;
    display block
}
.username {
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 24px;
    color: var(--color-text-secondary);
}
.note
    font-size:16px
    margin-bottom 16px
.secondary
    line-height:20px
    margin-bottom 16px
    display flex
    flex-wrap wrap
    .dot
        margin 0 5px
    a
        color: var(--color-text-secondary)!important;
        white-space: nowrap!important;
        display flex
        align-items center
        &:hover
            color: var(--color-text-link)!important;
        span
            font-weight bold
            margin-right 3px

        .iconfont
            color inherit
            font-size:16px
            margin-right 3px
.detail
    li
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height 26px
        color: var(--color-text-secondary)!important;
        a
            color: var(--color-text-secondary)!important;
            &:hover
                color: var(--color-text-link)!important;
        .iconfont
            color: var(--color-text-tertiary);
            font-size: 16px
            // font-weight: bold
            margin-right 3px
</style>
