const utils = require('../utils')
module.exports = function (cfg, site) {
    const U = utils(cfg, site)
    let apiData = []
    apiData = apiData.concat(
        U.posts.map(function (post) {
            const path = 'api/articles/' + post.slug + '.json'
            return {
                path: path,
                data: JSON.stringify({
                    title: post.title,
                    slug: post.slug,
                    date: post.date,
                    updated: post.updated,
                    comments: post.comments,
                    path: path,
                    photos: post.photos,
                    link: post.link,
                    excerpt: U.filterHTMLTags(post.excerpt),
                    covers: U.fetchCovers(post.content),
                    keywords: cfg.keyword,
                    content: post.content,
                    categories: post.categories.map(function (cat) {
                        return {
                            name: cat.name,
                            slug: cat.slug,
                            count: cat.posts.length,
                            path: 'api/categories/' + cat.slug + '.json',
                        }
                    }),
                    tags: post.tags.map(function (tag) {
                        return {
                            name: tag.name,
                            slug: tag.slug,
                            count: tag.posts.length,
                            path: 'api/tags/' + tag.slug + '.json',
                        }
                    }),
                }),
            }
        })
    )
    return apiData
}
