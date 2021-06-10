const getSiteJson = require('./json/site')
const getCategoriesJson = require('./json/categories')
const getTagsJson = require('./json/tags')
const getPostsJson = require('./json/posts')
const getPagesJson = require('./json/pages')
const getPsotJson = require('./json/post')
module.exports = function (cfg, site) {
    const siteJson = getSiteJson(cfg, site)
    const categoriesJson = getCategoriesJson(cfg, site)
    const tagsJson = getTagsJson(cfg, site)
    const postsJson = getPostsJson(cfg, site)
    const pagesJson = getPagesJson(cfg, site)
    const postJson = getPsotJson(cfg, site)

    return [].concat(siteJson, categoriesJson, tagsJson, postsJson, pagesJson, postJson)
}
