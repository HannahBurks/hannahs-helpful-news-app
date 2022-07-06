const express = require("express");
const {
  getTopics,
  getArticles,
  getArticlesById,
  patchArticleById,
  getUsers,
  getCommentsByArticleId
} = require("./controllers/controller");
const{customErr, emptyPatch, stringInsteadOfNumber,invalidPath, serverError} = require('./errors.js')

const app = express();
app.use(express.json());
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles", getArticles);
app.patch("/api/articles/:article_id",patchArticleById);
app.get("/api/users", getUsers);
app.get("/api/articles/:article_id/comments",getCommentsByArticleId)

app.use(customErr);
app.use(emptyPatch);
app.use(stringInsteadOfNumber);
app.use(invalidPath);
app.use(serverError);

module.exports = app;
