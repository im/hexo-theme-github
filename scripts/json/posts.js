const utils = require('../utils')
module.exports = function (cfg, site) {
    const U = utils(cfg, site)
    let apiData = []
    apiData = apiData.concat(
        site.pages.data.map(function (page) {
            const safe_title = page.title
                .replace(/[^a-z0-9]/gi, '-')
                .toLowerCase()
            const sourceMappedPath = page.source.replace(/\.md$/, '.json')
            const path = 'api/pages/' + sourceMappedPath
            return {
                path: path,
                data: JSON.stringify({
                    title: page.title,
                    date: page.date,
                    updated: page.updated,
                    comments: page.comments,
                    path: path,
                    covers: U.fetchCovers(page.content),
                    excerpt: U.filterHTMLTags(page.excerpt),
                    content: page.content,
                }),
            }
        })
    )
    return apiData
}
