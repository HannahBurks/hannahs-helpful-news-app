const express = require("express");
const {
  getTopics,
  getArticles,
  getArticlesById,
  patchArticleById,
  getUsers,
  getCommentsByArticleId,
  addNewComment,
  deleteCommentById
} = require("./controllers/controller");
const{customErr, emptyPatchOrPost, stringInsteadOfNumber,invalidPath, serverError, noUser, noArticleId, failingSchema} = require('./errors.js')

const app = express();
app.get("/api", controllers.getApi)
app.use(express.json());
app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles", getArticles);
app.patch("/api/articles/:article_id",patchArticleById);
app.get("/api/users", getUsers);
app.get("/api/articles/:article_id/comments",getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", addNewComment);
app.delete("/api/comments/:comment_id", deleteCommentById)

app.use(customErr);
app.use(emptyPatchOrPost);
app.use(stringInsteadOfNumber);
app.use(noUser);
app.use(noArticleId);
app.use(failingSchema);
app.use(invalidPath);
app.use(serverError);


module.exports = app;
