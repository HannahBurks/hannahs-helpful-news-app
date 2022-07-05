const {
  fetchAllTopics,
  fetchArticles,
  fetchArticlesbyId,
} = require("../models/models");

exports.getTopics = (req, res, next) => {
  fetchAllTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params
  fetchArticlesbyId(article_id).then((article) => {
    res.status(200).send({ articles: article });
  }).catch((err) =>{
      console.log(err)
next(err)
  })};


exports.getArticles = (req, res, next) => {
  fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};
