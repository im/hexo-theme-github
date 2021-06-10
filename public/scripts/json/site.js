module.exports = function (cfg, site) {
    return [{
        path: 'api/site.json',
        data: JSON.stringify(cfg),
    }]
}
