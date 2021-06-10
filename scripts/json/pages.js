const utils = require('../utils')
module.exports = function (cfg, site) {
    const U = utils(cfg, site)
    const postlist = U.posts.map(U.postMap)
    let apiData = []
    if (U.restful.posts_size > 0) {
        const page_posts = [],
            len = postlist.length,
            ps = U.restful.posts_size,
            pc = Math.ceil(len / ps)

        console.log('len: ', len, pc, ps)
        for (let i = 0; i < len; i += ps) {
            page_posts.push({
                path: 'api/posts/' + Math.ceil((i + 1) / ps) + '.json',
                data: JSON.stringify({
                    total: len,
                    pageSize: ps,
                    pageCount: pc,
                    data: postlist.slice(i, i + ps),
                }),
            })
        }

        apiData.push({
            path: 'api/posts.json',
            data: page_posts[0].data,
        })

        apiData = apiData.concat(page_posts)
    } else {
        apiData.push({
            path: 'api/posts/1.json',
            data: JSON.stringify({
                total: postlist.length,
                pageSize: postlist.length,
                pageCount: 1,
                data: postlist,
            }),
        })
    }
    return apiData
}
