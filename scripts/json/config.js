module.exports = function (cfg, site) {
    cfg.total = {
        posts: site.posts.length,
        categories: site.categories.length,
        tags: site.tags.length,
    }
    return [{
        path: 'api/config.json',
        data: JSON.stringify(cfg),
    }]
}
