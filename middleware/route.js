const client = require("../config/redis.config");

exports.cacheRouteOne = async (req, res, next) => {
  let data = await client.get("ping");
  console.log("data of ping");
  if (data != null) {
    res.json({
      postss: JSON.parse(data),
    });
    console.log("yes");
  } else {
    next();
  }
};
// let newData = [];
// for (let item in data) {
// console.log(JSON.stringify(i));
// newData.push(item);
// }
// next();
// console.log(JSON.stringify(client.scanIterator()));
