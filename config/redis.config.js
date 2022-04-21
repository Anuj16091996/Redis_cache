const redis = require("redis");
const client = redis.createClient({
  socket: {
    port: 6379,
    host: "127.0.0.1",
  },
});
(async () => {
  // Connect to redis server
  await client.connect();
})();

console.log("Attempting to connect to redis");
client.on("connect", () => {
  console.log("Connected!");
});

// Log any error that may occur to the console
client.on("error", (err) => {
  console.log(`Error:${err}`);
});

module.exports = client;
