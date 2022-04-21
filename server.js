const express = require("express");
const cors = require("cors");
const PORT = 3001;
const RouteController = require("./controllers/routes.controller");
const request = require("supertest");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hatchway Backend.");
});

//Can you please tell me in my review that when i call the middleware function it hangs my api call
//It stuck after client.get() method in middleware route
//I even ask the question on stack overlfow, but there was no proper response.
const middleWare = require("./middleware/route");
app.get("/api/ping", middleWare.cacheRouteOne, RouteController.routeOne);

// app.get("/api/ping", RouteController.routeOne);

app.get("/api/posts", RouteController.routeTwo);

request(app)
  .get("/api/posts")
  .expect("Content-Type", /json/)
  .end((err) => {
    if (err) throw err;
  });

request(app)
  .get("/api/ping")
  .expect("Content-Type", /json/)
  .end((err) => {
    if (err) throw err;
  });

app.listen(PORT);
console.log(`Running on port ${PORT}. `);
