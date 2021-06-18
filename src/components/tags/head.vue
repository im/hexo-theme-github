<template>
    <header class="header">
        <div class="item hidden-xs-only">
            <router-link tag="a" class="link" :to="{ name: 'home' }">
                <i class="iconfont icon-huaban88 logo-icon"></i>
            </router-link>
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
                <el-autocomplete
                    v-model="keyword"
                    :fetch-suggestions="querySearchAsync"
                    popper-class="search-popper"
                    ref="search"
                    @select="handleSelect"
                    placeholder="Search or jump to…"
                >
                    <template #default="{ item }">
                        <span class="jump-to">
                            Jump to
                            <i class="iconfont icon-huiche"></i>
                        </span>
                        <div class="search-title">
                            <i
                                class="iconfont"
                                :class="typeIconMap[item.type]"
                            ></i>
                            <span v-html="item.title"></span>
                        </div>
                        <div
                            class="search-text"
                            :title="item.text"
                            v-html="item.text"
                            v-if="item.type === 'POSTS'"
                        ></div> </template
                ></el-autocomplete>
                <!-- <input
                    placeholder="Search or jump to…"
                    class="search-input"
                    autocomplete="off"
                    id="search-input"
                    ref="searchInput"
                /> -->
                <i class="search-key-slash">/</i>
            </label>
            <!-- <nav>
                <a href="/" class="link">Pull requests</a>
                <a href="/" class="link">Issues</a>
                <a href="/" class="link">Marketplace</a>
                <a href="/" class="link">Explore</a>
            </nav> -->
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
import { fetchSearch } from '@/api'
export default defineComponent({
    name: 'Head',
    props: {},
    data() {
        return {
            keyword: '',
            searchData: null,
            typeIconMap: {
                POSTS: 'icon-repo',
                TAGS: 'icon-tags',
                CATEGORIES: 'icon-wenjianjia',
            },
        }
    },
    methods: {
        handleSelect(result) {
            const routeMap = {
                CATEGORIES: 'categories',
                TAGS: 'tags',
                POSTS: 'post',
            }
            this.$router.push({
                name: routeMap[result.type],
                params: {
                    slug: result.link,
                },
            })
            this.closeSearch()
        },
        async querySearchAsync(keywords, cb) {
            if (!this.searchData) {
                await this.fetchSearch()
            }
            const data = this.search(this.searchData, keywords)

            cb(data)
        },
        findAndHighlight(text, matches, maxlen) {
            if (!Array.isArray(matches) || !matches.length || !text) {
                return maxlen ? text.slice(0, maxlen) : text
            }
            const testText = text.toLowerCase()
            const indices = matches
                .map((match) => {
                    const index = testText.indexOf(match.toLowerCase())
                    if (!match || index === -1) {
                        return null
                    }
                    return [index, index + match.length]
                })
                .filter((match) => {
                    return match !== null
                })
                .sort((a, b) => {
                    return a[0] - b[0] || a[1] - b[1]
                })

            if (!indices.length) {
                return text
            }

            let result = ''
            let last = 0
            const ranges = this.merge(indices)
            const sumRange = [ranges[0][0], ranges[ranges.length - 1][1]]
            if (maxlen && maxlen < sumRange[1]) {
                last = sumRange[0]
            }

            for (let i = 0; i < ranges.length; i++) {
                const range = ranges[i]
                result += text.slice(
                    last,
                    Math.min(range[0], sumRange[0] + maxlen)
                )
                if (maxlen && range[0] >= sumRange[0] + maxlen) {
                    break
                }
                result += '<em>' + text.slice(range[0], range[1]) + '</em>'
                last = range[1]
                if (i === ranges.length - 1) {
                    if (maxlen) {
                        result += text.slice(
                            range[1],
                            Math.min(text.length, sumRange[0] + maxlen + 1)
                        )
                    } else {
                        result += text.slice(range[1])
                    }
                }
            }

            return result
        },
        merge(ranges) {
            let last
            const result = []

            ranges.forEach((r) => {
                if (!last || r[0] > last[1]) {
                    result.push((last = r))
                } else if (r[1] > last[1]) {
                    last[1] = r[1]
                }
            })

            return result
        },
        sectionFactory(keywords, type, array) {
            let $searchItems
            if (array.length === 0) return null
            switch (type) {
                case 'POSTS':
                case 'PAGES':
                    $searchItems = array.map((item) => {
                        const title = this.findAndHighlight(
                            item.title,
                            keywords
                        )
                        const text = this.findAndHighlight(
                            item.text,
                            keywords,
                            100
                        )
                        return {
                            title,
                            link: item.link,
                            text,
                            type,
                        }
                    })
                    break
                case 'CATEGORIES':
                case 'TAGS':
                    $searchItems = array.map((item) => {
                        const title = this.findAndHighlight(
                            item.title,
                            keywords
                        )
                        const link = this.findAndHighlight(item.link, keywords)
                        return {
                            title,
                            text: item.text,
                            link,
                            type,
                        }
                    })
                    break
                default:
                    return null
            }
            return $searchItems
        },

        parseKeywords(keywords) {
            return keywords
                .split(' ')
                .filter((keyword) => {
                    return !!keyword
                })
                .map((keyword) => {
                    return keyword.toLowerCase()
                })
        },
        weight(keywords, obj, fields, weights) {
            let value = 0
            this.parseKeywords(keywords).forEach((keyword) => {
                const pattern = new RegExp(keyword, 'img')
                fields.forEach((field, index) => {
                    if (Object.prototype.hasOwnProperty.call(obj, field)) {
                        const matches = obj[field].match(pattern)
                        value += matches ? matches.length * weights[index] : 0
                    }
                })
            })
            return value
        },
        filter(keywords, obj, fields) {
            const keywordArray = this.parseKeywords(keywords)
            const containKeywords = keywordArray.filter((keyword) => {
                const containFields = fields.filter((field) => {
                    if (!Object.prototype.hasOwnProperty.call(obj, field)) {
                        return false
                    }
                    if (obj[field].toLowerCase().indexOf(keyword) > -1) {
                        return true
                    }
                    return false
                })
                if (containFields.length > 0) {
                    return true
                }
                return false
            })
            return containKeywords.length === keywordArray.length
        },
        filterFactory(keywords) {
            return {
                post: (obj) => {
                    return this.filter(keywords, obj, ['title', 'text'])
                },
                page: (obj) => {
                    return this.filter(keywords, obj, ['title', 'text'])
                },
                category: (obj) => {
                    return this.filter(keywords, obj, ['name', 'slug'])
                },
                tag: (obj) => {
                    return this.filter(keywords, obj, ['name', 'slug'])
                },
            }
        },
        weightFactory(keywords) {
            return {
                post: (obj) => {
                    return this.weight(keywords, obj, ['title', 'text'], [3, 1])
                },
                page: (obj) => {
                    return this.weight(keywords, obj, ['title', 'text'], [3, 1])
                },
                category: (obj) => {
                    return this.weight(keywords, obj, ['name', 'slug'], [1, 1])
                },
                tag: (obj) => {
                    return this.weight(keywords, obj, ['name', 'slug'], [1, 1])
                },
            }
        },
        search(json, keywords) {
            const weights = this.weightFactory(keywords)
            const filters = this.filterFactory(keywords)
            const posts = json.posts
            const pages = json.pages || []
            const tags = json.tags
            const categories = json.categories

            const data = {
                posts: posts
                    .filter(filters.post)
                    .sort((a, b) => {
                        return weights.post(b) - weights.post(a)
                    })
                    .slice(0, 5),
                pages: pages
                    .filter(filters.page)
                    .sort((a, b) => {
                        return weights.page(b) - weights.page(a)
                    })
                    .slice(0, 5),
                categories: categories
                    .filter(filters.category)
                    .sort((a, b) => {
                        return weights.category(b) - weights.category(a)
                    })
                    .slice(0, 5),
                tags: tags
                    .filter(filters.tag)
                    .sort((a, b) => {
                        return weights.tag(b) - weights.tag(a)
                    })
                    .slice(0, 5),
            }

            const keys = Object.keys(data)
            let searchArr = []
            keys.forEach((key) => {
                const val = this.sectionFactory(
                    this.parseKeywords(keywords),
                    key.toUpperCase(),
                    data[key]
                )
                val && (searchArr = searchArr.concat(val))
            })
            return searchArr
        },
        async fetchSearch() {
            const data = await fetchSearch()
            this.searchData = data
        },
        closeSearch() {
            this.$refs.search.inputRef.blur()
            this.$refs.search.close()
            this.$refs.search.handleClear()
        },
    },
    mounted() {
        document.onkeydown = (e) => {
            const ev = e ? e : window.event
            const currKey = ev.keyCode || ev.which || ev.charCode
            if (currKey === 191) {
                setTimeout(() => {
                    this.$refs.search.focus()
                    if (!this.searchData) {
                        this.fetchSearch()
                    }
                }, 10)
            }
            if (currKey === 27) {
                this.closeSearch()
            }
        }
    },
    beforeDestroy() {
        document.onkeydown = null
    },
})
</script>

<style lang="stylus" scoped>
.header
    z-index 32
    padding 16px
    font-size 14px
    color var(--color-header-text)
    background-color var(--color-header-bg)
    display flex
    align-items center
    flex-wrap nowrap
    .logo
        justify-content center
        margin-right 0
    .icon-bar1
        // font-weight 600
        color var(--color-header-logo)
        white-space nowrap
        display block
        font-size 22px
    .item
        display flex
        align-items center
        flex-wrap nowrap
        margin-right 16px
        &.item-full
            flex auto
    .link
        font-weight 600
        color var(--color-header-logo)
        white-space nowrap
        display block
        .logo-icon
            font-size 32px
        &:hover
            color var(--color-header-text)
            text-decoration none
    .search-wrapper
        width 100%
        padding 0
        font-size inherit
        font-weight 400
        color var(--color-text-white)
        vertical-align middle
        background-color var(--color-header-search-bg)
        border 1px solid var(--color-header-search-border)
        box-shadow none
        border-radius 6px
        font-size 14px
        min-height 28px
        margin-right 16px
        display flex
        justify-content space-between
        align-items center
        overflow hidden
        // transition 0.4s
        max-width 272px
        &:focus-within
            border-color var(--color-state-focus-border)
            outline none
            box-shadow var(--color-state-focus-shadow)
            max-width 700px
            .search-key-slash
                display none
            /deep/
                .el-input__inner
                    color var(--color-text-primary) !important
                    background-color var(--color-bg-secondary)
                    width 100%
        .search-input
            height 28px
            font-size inherit
            color inherit
            background none
            border 0
            box-shadow none
            line-height 20px
            outline none
            padding 5px 12px
        .search-key-slash
            display block
            width 20px
            height 20px
            border 1px solid var(--color-header-search-border)
            border-radius 4px
            text-align center
            line-height 20px
            font-size 12px
            color rgb(151, 154, 156)
            margin-right 12px
    nav
        display flex
        align-items center
        a
            padding 16px 0
            margin -16px 16px -16px 0
    .avatars
        white-space nowrap
        img
            display inline-block
            overflow hidden
            vertical-align middle
            background-color var(--color-avatar-bg)
            box-shadow 0 0 0 1px var(--color-avatar-border)
            border-radius 50%
            width 20px
            height 20px
            margin-right 5px
    .icon-item
        font-size 12px
        display flex
        align-items center
        position relative
        .icon-icon-add
            transform scale(0.8)
            margin-right 4px
            display block
    .icon-tongzhi3
        transform scale(1.2)
    .notification
        position absolute
        top -6px
        left 6px
        z-index 2
        width 14px
        height 14px
        color var(--color-text-white)
        background-image linear-gradient(#54a3ff, #006eed)
        background-clip padding-box
        border 2px solid var(--color-header-bg)
        border-radius 50%
/deep/
    .el-autocomplete
        width 100%
        height 28px
        font-size inherit
        color inherit
        background none
        border 0
        box-shadow none
        line-height 20px
        outline none
        background transparent
        .el-input__inner
            line-height 28px
            height inherit
            border 0
            border-radius 0
            background transparent
        .el-input
            line-height 28px
            background transparent
    .search-popper
        top 0
</style>
<style lang="stylus">
.el-autocomplete-suggestion
    padding 0
    li
        border-bottom: 1px solid var(--color-border-primary);
        position relative
        .jump-to
            border: 1px solid var(--color-border-primary);
            color: var(--color-text-secondary);
            border-radius 5px
            font-size 12px
            position absolute
            right 10px
            top calc(50% - 10px)
            height 20px
            padding 0 5px
            line-height 20px
            z-index 1
            background-color #fff
            opacity 0
            .iconfont
                font-size 12px
        em
            font-style: normal;
            background: #ffdd57;
        &:last-child
            border 0
        .search-text, .search-title
            color: var(--color-text-secondary);
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size 14px
        .search-title

            .iconfont
                font-size 12px
                margin-right 5px
        .search-text
            font-size 12px
            padding-left 17px
        &.highlighted, &:hover
            background var(--color-text-link)!important
            .jump-to
                opacity 1
            .search-text, .search-title
                color: var(--color-pr-state-open-text);
</style>
