const utils = require('../utils')
module.exports = function (cfg, site) {
    const categories = site.categories
    const U = utils(cfg, site)

    const cates = U.cateReduce(categories, 'categories')
    let apiData = []

    if (!!cates.length) {
        apiData.push({
            path: 'api/categories.json',
            data: JSON.stringify(cates.map(U.catesMap)),
        })

        const catesMaps = cates.map(U.cateMap)
        apiData = apiData.concat(catesMaps)
    }
    return apiData
}
