const pagination = require('hexo-pagination')
function filterHTMLTags(str) {
    return str
        ? str
              .replace(/\<(?!img|br).*?\>/g, '')
              .replace(/\r?\n|\r/g, '')
              .replace(/<img(.*)>/g, ' [Figure] ')
        : null
}

function fetchCovers(str) {
    let temp,
        imgURLs = [],
        rex = /<img[^>]+src="?([^"\s]+)"(.*)>/g
    while ((temp = rex.exec(str))) {
        imgURLs.push(temp[1])
    }
    return imgURLs.length > 0 ? imgURLs : null
}

function fetchCover(str) {
    const covers = fetchCovers(str)
    return covers ? covers[0] : null
}
module.exports = function (cfg, site) {
    const posts = site.posts.sort('-date').filter(function (post) {
        return post.published
    })
    const restful = {
        site: true,
        posts_size: cfg.per_page,
        posts_props: {
            title: true,
            slug: true,
            date: true,
            updated: true,
            comments: true,
            cover: true,
            path: true,
            photos: true,
            text: true,
            raw: false,
            link: true,
            excerpt: true,
            content: true,
            categories: true,
            tags: true,
        },
        categories: true,
        tags: true,
        post: true,
        pages: true,
    }
    const postsProps = (() => {
        const props = restful.posts_props

        return function (name, val) {
            return props[name]
                ? typeof val === 'function'
                    ? val()
                    : val
                : null
        }
    })()
    const postMap = (post) => {
        return {
            title: postsProps('title', post.title),
            slug: postsProps('slug', post.slug),
            date: postsProps('date', post.date),
            updated: postsProps('updated', post.updated),
            comments: postsProps('comments', post.comments),
            path: postsProps('path', 'api/articles/' + post.slug + '.json'),
            excerpt: postsProps('excerpt', post.excerpt),
            keywords: postsProps('keywords', cfg.keywords),
            cover: postsProps('cover', post.cover || fetchCover(post.content)),
            content: postsProps('content', post.excerpt ? null : post.content),
            text: postsProps(
                'text',
                filterHTMLTags(post.content).substring(0, 140)
            ),
            link: postsProps('link', post.link),
            raw: postsProps('raw', post.raw),
            photos: postsProps('photos', post.photos),
            categories: postsProps('categories', function () {
                return post.categories.map(function (cat) {
                    return {
                        name: cat.name,
                        slug: cat.slug,
                        count: cat.posts.length,
                        path: 'api/categories/' + cat.slug + '.json',
                    }
                })
            }),
            tags: postsProps('tags', function () {
                return post.tags.map(function (tag) {
                    return {
                        name: tag.name,
                        slug: tag.slug,
                        count: tag.posts.length,
                        path: 'api/tags/' + tag.slug + '.json',
                    }
                })
            }),
        }
    }
    const cateReduce = (cates, name) => {
        return cates.reduce(function (result, item) {
            if (!item.length) return result
            return result.concat(
                pagination(item.path, posts, {
                    perPage: 0,
                    data: {
                        name: item.name,
                        slug: item.slug,
                        count: item.posts.length,
                        path: 'api/' + name + '/' + item.slug + '.json',
                        postlist: item.posts.map(postMap),
                    },
                })
            )
        }, [])
    }
    const catesMap = function (item) {
        return {
            name: item.data.name,
            path: item.data.path,
            slug: item.data.slug,
            count: item.data.count,
        }
    }

    const cateMap = function (item) {
        const itemData = item.data
        return {
            path: itemData.path,
            data: JSON.stringify({
                name: itemData.name,
                slug: itemData.slug,
                count: itemData.count,
                postlist: itemData.postlist,
            }),
        }
    }

    return {
        restful,
        cateReduce,
        postMap,
        postsProps,
        posts,
        catesMap,
        cateMap,
        filterHTMLTags,
        fetchCover,
        fetchCovers,
    }
}
