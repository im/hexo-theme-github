const utils = require("../utils");
module.exports = function (cfg, site) {
  const U = utils(cfg, site);
  const posts = U.posts.map((post, index) => {
    return {
      title: post.title,
      slug: post.slug,
      date: post.date,
      updated: post.updated,
      comments: post.comments,
    };
  });
  return [
    {
      path: "api/allpost.json",
      data: JSON.stringify(posts),
    },
  ];
};
