const {
  fetchAllTopics,
  fetchArticles,
  fetchArticlesbyId,
  updateArticleById,
  fetchAllUsers,
  fetchCommentsByArticleId,
  insertComment
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
const query = req.query
const sortby = query.sort_by;
const order = query.order;
const topic = query.topic
  fetchArticles(sortby, order, topic).then((articles) => {
    res.status(200).send({ articles });
  }).catch((err)=>{
    next(err)
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
    fetchCommentsByArticleId(article_id).then((articles) => {
      res.status(200).send(articles);
    }).catch((err) =>{
  next(err)
    })};

    exports.addNewComment = (req, res, next) => {
        const {username, body} = req.body;
        const {article_id} = req.params
       insertComment(username, body, article_id,).then((comment) => {
           res.status(201).send({ comment })
         }).catch((err) =>{
            next(err)
       })};