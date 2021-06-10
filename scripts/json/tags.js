const utils = require('../utils')
module.exports = function (cfg, site) {
    const U = utils(cfg, site)

    const tags = U.cateReduce(site.tags, 'tags')
    let apiData = []

    if (!!tags.length) {
        apiData.push({
            path: 'api/tags.json',
            data: JSON.stringify(tags.map(U.catesMap)),
        })

        const catesMaps = tags.map(U.cateMap)
        apiData = apiData.concat(catesMaps)
    }
    return apiData
}
