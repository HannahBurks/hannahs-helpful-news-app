const {
  fetchAllTopics,
  fetchArticles,
  fetchArticlesbyId,
  updateArticleById,
  fetchAllUsers,
  fetchCommentsByArticleId
} = require("../models/models");

exports.getTopics = (req, res, next) => {
  fetchAllTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params
  fetchArticlesbyId(article_id).then((article) => {
    res.status(200).send({ article: article });
  }).catch((err) =>{
next(err)
  })};


exports.getArticles = (req, res, next) => {
  fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
};

exports.patchArticleById = (req, res, next) => {
    const { article_id } = req.params;
    const votes = req.body;
    const changeToVote = votes.inc_votes
   updateArticleById({article_id, changeToVote}).then((article) => {
   res.status(200).send({article});
   }).catch((err) =>{
    next(err)
   })
}

exports.getUsers = (req, res, next) => {
    fetchAllUsers().then((users) => {
      res.status(200).send({ users });
    });
  };

  exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params
    console.log(req.params)
    fetchCommentsByArticleId(article_id).then((articles) => {
      res.status(200).send(articles);
    }).catch((err) =>{
  next(err)
    })};