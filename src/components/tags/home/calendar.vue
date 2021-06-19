<template>
    <div class="calendar-main">
        <div class="left">
            <h2 v-if="selectYear">
                {{ contributionsTotal }} contributions in {{ selectYear }}
            </h2>
            <h2 v-else>
                {{ contributionsTotal }} contributions in the last year
            </h2>
            <Contributions
                :data="contributions"
                :year="selectYear"
                @updateContributions="updateContributions"
            ></Contributions>
            <div class="activity" v-if="activityList.length">
                <h4>Contribution activity</h4>
                <div class="activity-listing">
                    <div class="activity-box" v-for="key in activityList">
                        <h6>
                            <span>{{ getMonth(key) }}</span
                            ><span>{{ getFullYear(key) }}</span>
                        </h6>
                        <div class="item" v-for="post in activityMap[key]">
                            <div class="badge">
                                {{getDay(post)}}
                            </div>
                            <div class="body">
                                <div class="title">
                                    <router-link
                                        :to="{
                                            name: 'post',
                                            params: { slug: post.slug },
                                        }"
                                        class="title"
                                        tag="a"
                                    >
                                        {{ post.title }}
                                    </router-link>
                                </div>
                                <div class="desc">{{ post.text }}</div>
                                <div class="secondary">
                                    <router-link
                                        tag="a"
                                        :to="{
                                            name: 'categories',
                                            params: {
                                                slug: categories(post).slug,
                                            },
                                        }"
                                        class="link"
                                        v-if="categories(post)"
                                    >
                                        <i class="iconfont icon-wenjianjia"></i>
                                        {{ categories(post).name }}
                                    </router-link>
                                    <ul>
                                        <li
                                            v-for="item in post.tags"
                                            :key="item.slug"
                                        >
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
                        </div>
                    </div>
                </div>
                <button class="btn" v-if="isShowMoreBtn" @click="showMore">
                    Show more activity
                </button>
            </div>
        </div>
        <ul class="right">
            <li
                :class="{ active: year === currentYear }"
                @click="tabYear(year)"
                v-for="year in yearList"
            >
                {{ year }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, inject } from 'vue'
import Contributions from 'components/tags/contributions.vue'
import { monthText, formatP, weekText, PrefixZero, format } from '@/utils/date'
import { getTagBgColor } from '@/utils'
export default defineComponent({
    name: 'calendar',
    inject: ['hexo'],
    props: ['allPost'],
    components: {
        Contributions,
    },
    data() {
        return {
            currentYear: new Date().getFullYear(),
            selectYear: null,
            currentDateData: {},
            showMoreActivityIndex: 0,
        }
    },
    computed: {
        contributionsTotal() {
            let total = 0
            const keys = Object.keys(this.currentDateData)
            keys.forEach((item) => {
                total = total + this.currentDateData[item]
            })
            return total
        },
        contributions() {
            const obj = {}
            this.allPost.forEach((post) => {
                const date = formatP(new Date(post.date))
                if (obj[date]) {
                    obj[date] = obj[date] + 1
                } else {
                    obj[date] = 1
                }
            })
            return obj
        },
        yearList() {
            const currentYear = new Date()
            const years = Array.from(
                new Set(
                    Object.keys(this.contributions)
                        .concat([currentYear])
                        .map((v) => new Date(v).getFullYear())
                )
            )
            const max = Math.max.apply(null, years)
            const min = Math.min.apply(null, years)
            const yearArr = []
            for (let i = min; i <= max; i++) {
                yearArr.push(i)
            }
            return yearArr.reverse()
        },
        contributionsMap() {
            const map = {}
            this.allPost.forEach((post) => {
                const date = new Date(post.date)
                const year = date.getFullYear()
                const month = date.getMonth() + 1
                if (map[year]) {
                    if (map[year][month]) {
                        map[year][month].push(post)
                    } else {
                        map[year][month] = [post]
                    }
                } else {
                    map[year] = {}
                    map[year][month] = [post]
                }
            })
            return map
        },
        activityMap() {
            const keys = Object.keys(this.currentDateData).reverse()
            const map = {}
            keys.forEach((d) => {
                const date = new Date(d)
                const year = date.getFullYear() + ''
                const month = PrefixZero(date.getMonth() + 1, 2) + ''
                const key = year + '-' + month + '-' + '01'
                const post =
                    this.contributionsMap[date.getFullYear()][
                        date.getMonth() + 1
                    ]
                if (map[key]) {
                    map[key].concat(post)
                } else {
                    map[key] = post
                }
            })
            return map
        },
        activityLen() {
            return Object.keys(this.activityMap).length
        },
        activityList() {
            return Object.keys(this.activityMap).filter((v, index) => {
                return index <= this.showMoreActivityIndex
            })
        },
        isShowMoreBtn() {
            return (
                this.activityLen &&
                this.activityLen >= 2 &&
                this.showMoreActivityIndex < this.activityLen
            )
        },
    },
    methods: {
        getDay (post) {
            return new Date(post.date).getDate()
        },
        showMore() {
            this.showMoreActivityIndex = this.showMoreActivityIndex + 1
        },
        getStyle(item) {
            return {
                'background-color': getTagBgColor(item.name),
            }
        },
        categories(post: any) {
            return post.categories ? post.categories[0] : null
        },
        tags(post: any) {
            return post.tags ? post.tags.length : null
        },
        getMonth(d) {
            return format(d).split(' ')[0]
        },
        getFullYear(d) {
            return new Date(d).getFullYear()
        },
        tabYear(year) {
            this.currentYear = year
            this.selectYear = year
        },
        updateContributions(data) {
            this.currentDateData = data
            this.showMoreActivityIndex = 0
        },
    },
})
</script>

<style scoped lang="stylus">
.calendar-main
    margin-top 24px
    padding 0 8px
    display flex
    justify-content space-between
    ul
        list-style none
    .activity
        margin-top 30px
    h2
        font-weight 400
        margin-bottom 10px
    h4
        font-weight 300
        margin-bottom 24px
    .left
        width calc(100% - 140px)
    .right
        width 100px
        list-style none
        li
            padding 8px 16px
            position: relative;
            display: block;
            margin-bottom: 4px;
            overflow: hidden;
            font-size: 14px;
            color: var(--color-text-secondary);
            text-decoration: none;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            border-radius: 6px;
            &:hover
                background-color: var(--color-bg-tertiary);
            &.active
                color: var(--color-state-selected-primary-text);
                background-color: var(--color-state-selected-primary-bg);
    .btn
        width: 100%;
        padding: 8px 0;
        margin-top: 20px;
        font-weight: 600;
        color: var(--color-text-link);
        background: var(--color-bg-primary);
        border: 1px solid var(--color-border-primary);
        border-radius: 6px;
        &:hover
            color: var(--color-text-link);
            background-color: var(--color-bg-tertiary);
            cursor:pointer
.activity-box

    h6
        height: 14px;
        padding-right: 8px!important;
        padding-top: 4px!important;
        padding-bottom: 4px!important;
        margin-bottom: 16px!important;
        border-bottom: 1px solid var(--color-border-primary)!important;
        color: var(--color-text-primary);
        span
            background-color: var(--color-bg-canvas)!important;
            padding-right 8px
    .item
        position: relative;
        display: flex;
        padding: 16px 0;
        margin-left: 16px;
        &:before
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            display: block;
            width: 2px;
            content: "";
            background-color: var(--color-border-secondary);
        .badge
            position: relative;
            z-index: 1;
            display: flex;
            width: 32px;
            height: 32px;
            margin-right: 8px;
            margin-left: -15px;
            color: var(--color-icon-secondary);
            align-items: center;
            background-color: var(--color-timeline-badge-bg);
            border: 2px solid var(--color-bg-canvas);
            border-radius: 50%;
            justify-content: center;
            flex-shrink: 0;
        .body
            min-width: 0;
            max-width: 100%;
            margin-top: 4px;
            color: var(--color-timeline-text);
            flex: auto;
            .secondary
                display flex
                align-items: center
                .link
                    font-size: 12px
                .date
                    color: var(--color-text-secondary);
                    font-size 12px
            a
                color: var(--color-text-primary)
                &:hover
                    color: var(--color-text-link)!important;
            .title
                margin-bottom: 8px
            .desc
                color: var(--color-text-secondary);
                font-size: 12px
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
