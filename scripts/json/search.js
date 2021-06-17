const utils = require("../utils");
module.exports = function (cfg, site) {
  const U = utils(cfg, site);
  const posts = U.posts.map(U.postMap).map((post) => ({
    title: post.title.trim(),
    link: post.slug,
    text: post.text,
  }));
  const tags = U.cateReduce(site.tags, "tags").map((tag) => ({
    title: tag.data.name,
    link: tag.data.slug,
    text: tag.data.name,
  }));
  const categories = U.cateReduce(site.categories, "categories").map((cate) => {
    return {
      title: cate.data.name,
      link: cate.data.slug,
      text: cate.data.name,
    };
  });
  const obj = {
    categories,
    posts,
    tags,
  };
  return [
    {
      path: "api/search.json",
      data: JSON.stringify(obj),
    },
  ];
};
