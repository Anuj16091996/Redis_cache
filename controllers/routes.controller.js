const axios = require("axios");
const client = require("../config/redis.config");
const manipulateData = require("./dataManipulation");

exports.routeOne = (req, res) => {
  axios
    .get("https://api.hatchways.io/assessment/blog/posts?tag=tech")
    .then((response) => {
      client.setEx("ping", 3600, JSON.stringify(response.data.posts));
      res.status(200).json({
        status: true,
        posts: response.data.posts,
      });
    });
};

exports.routeTwo = (req, res) => {
  const tags = req.query.tags;
  const sortBy = req.query.sortBy != undefined ? req.query.sortBy : "likes";
  const direction =
    req.query.direction != undefined ? req.query.direction : "asc";
  if (tags == undefined) {
    res.status(400).json({
      error: "Tags parameter is required",
      status: 400,
    });
  } else {
    const filterResponse = [];
    const tag = tags.split(",");
    for (let pos = 0; pos < tag.length; pos++) {
      axios
        .get("https://api.hatchways.io/assessment/blog/posts?tag=" + tag[pos])
        .then((response) => {
          filterResponse.push(response.data.posts);
          if (pos == tag.length - 1) {
            const JSONfilter = manipulateData.validateJSON(
              filterResponse,
              sortBy.toLowerCase(),
              direction.toLowerCase(),
              tag
            );
            if (JSONfilter.post.length != 0) {
              res.status(200).json({
                status: 200,
                posts: JSONfilter.post,
              });
              res;
            } else {
              res.status(400).json({
                error: JSONfilter.message,
                status: 400,
              });
            }
          }
        });
    }
  }
};
