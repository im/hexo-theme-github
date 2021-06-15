<template>
    <div class="profile">
        <div class="user-info">
            <el-row class="home-main">
                <el-col :span="24" :xs="5">
                    <div
                        class="tooltipped tooltipped-s"
                        aria-label="Change your avatar"
                    >
                        <img
                            class="avatar"
                            src="/avatar.png"
                        />
                    </div>
                </el-col>
                <el-col :span="24" :xs="19">
                    <div class="name">
                        <h1>
                            <span class="fullname">糖小米</span>
                            <span class="username">im</span>
                        </h1>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="detail">
            <div class="note">
                Css, JavaScript, Vue, NodeCss, JavaScript, Vue, NodeCss,
                JavaScript, Vue, Node
            </div>
            <div class="secondary">
                <a href="/" class="link">
                    <i class="iconfont icon-rss"></i>
                    <span>10</span>
                    followers
                </a>
                ·
                <a href="/" class="link">
                    <i class="iconfont icon-rss"></i>
                    <span>10</span>
                    followers
                </a>
                ·
                <a href="/" class="link">
                    <i class="iconfont icon-rss"></i>
                    <span>10</span>
                    followers
                </a>
                ·
            </div>
            <ul>
                <li>
                    <i class="iconfont icon-rss"></i>
                    followers
                </li>
                <li>
                    <i class="iconfont icon-rss"></i>
                    followers
                </li>
                <li>
                    <i class="iconfont icon-rss"></i>
                    followers
                </li>
                <li>
                    <i class="iconfont icon-rss"></i>
                    followers
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: 'Profile',
    props: {},
})
</script>

<style lang="stylus">
.profile
    padding 0 8px
    margin-top -32px
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
    a
        color: var(--color-text-secondary)!important;
        white-space: nowrap!important;
        &:hover
            color: var(--color-text-link)!important;
        span
            font-weight bold

        .iconfont
            color inherit
            font-size:16px
.detail
    li
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height 20px
        .iconfont
            color: var(--color-text-tertiary);
</style>
