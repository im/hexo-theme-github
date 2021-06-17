const getConfigJson = require("./json/config");
// const getSiteJson = require('./json/site')
const getCategoriesJson = require("./json/categories");
const getTagsJson = require("./json/tags");
const getPostsJson = require("./json/posts");
const getSearchJson = require("./json/search");
const getPagesJson = require("./json/pages");
const getPsotJson = require("./json/post");
const getAllPsotJson = require("./json/allpost");
module.exports = function (cfg, site) {
  // const siteJson = getSiteJson(cfg, site)
  const configJson = getConfigJson(cfg, site);
  const allpostJson = getAllPsotJson(cfg, site);
  const categoriesJson = getCategoriesJson(cfg, site);
  const tagsJson = getTagsJson(cfg, site);
  const postsJson = getPostsJson(cfg, site);
  const pagesJson = getPagesJson(cfg, site);
  const postJson = getPsotJson(cfg, site);
  const searchJson = getSearchJson(cfg, site);

  return [].concat(
    categoriesJson,
    tagsJson,
    postsJson,
    pagesJson,
    postJson,
    configJson,
    allpostJson,
    searchJson
  );
};
