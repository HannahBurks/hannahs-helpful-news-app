const express = require("express");
const {
  getTopics,
  getArticles,
  getArticlesById,
} = require("./controllers/controller");

const app = express();
app.use(express.json());
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles", getArticles);

const customErr = app.use((err, req, res, next) => {
if(err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg })
} else next(err);
});

const invalidID = app.use((err, req, res, next) => {
    if (err.code === '22P02') {
      res.status(400).send({ msg: "Not a valid ID - this must be a number." });
    } else next(err);
  });

const invalidPath = app.use("*", (req, res) => {
  res.status(404).send({ msg: "Invalid path" });
});

const serverError = app.use((err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
});

module.exports = app;
