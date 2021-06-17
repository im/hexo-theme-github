module.exports = function (cfg, site) {
    console.log('site: ', site);
    return [{
        path: 'api/site.json',
        data: JSON.stringify(site),
    }]
}
