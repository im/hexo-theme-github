'use strict'
const generator = require('./generator')

hexo.extend.generator.register('liteRestfulApi', function (site) {
    return generator(
        Object.assign({}, hexo.config, {
            theme_config: hexo.theme.config,
        }),
        site
    )
})
