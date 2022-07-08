const db = require("../connection.js");
const { getTopics } = require("../controllers/controller.js");
const articles = require("../data/test-data/articles.js");
const users = require("../data/test-data/users.js");

exports.fetchAllTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((results) => {
    return results.rows;
  });
};

exports.fetchArticles = async (sortby = 'created_at', order = 'DESC', topics) => {
  if (order !== 'DESC' && order !== 'ASC'){
    return Promise.reject({ status: 404, msg: 'order not valid - must be ASC or DESC' });
    }
  if (sortby !== 'created_at' && sortby !== 'title' && sortby !== 'article_id' && sortby !== 'topic' && sortby !== 'author' && sortby !== 'body' && sortby !== 'votes'){
    return Promise.reject({ status: 404, msg: 'sort by catagory does not exist' });
  }
  if (topics === undefined){
    return db.query(`SELECT articles.* , COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments on comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY articles.${sortby} ${order};`).then((results) => {
      return results.rows;})
  } 
  if(topics.length > 0){
   const dbOutput = await db.query(
      `SELECT * FROM articles WHERE articles.topic = $1;`,[topics]
    );
    if (dbOutput.rows.length === 0) {
      return Promise.reject({ status: 404, msg: 'topic not found' });
    } else {
      return db.query(`SELECT articles.* , COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments on comments.article_id = articles.article_id  WHERE articles.topic = $1 GROUP BY articles.article_id ORDER BY articles.${sortby} ${order};`,[topics]).then((results) => {
        return results.rows;})
    }

    }
  } 

exports.fetchArticlesbyId = (article_id) => {
    
  return db.query(`SELECT articles.* , COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments on comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;`, [article_id]).then((results) => {
        if (!results.rows[0]) {
          return Promise.reject({
            status: 404,
            msg: `No article found for article_id: ${article_id}`,
          });
        }
        return results.rows[0];
      });
  };

  exports.updateArticleById = ({article_id, changeToVote}) => {
    return db.query('UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *',
    [changeToVote, article_id]).then(({ rows }) => {
        if (!rows[0]) {
            return Promise.reject({
              status: 404,
              msg: `No article found for article_id: ${article_id}`,
            });
          }
        return rows[0];
    });
    
};

exports.fetchAllUsers = () => {
    return db.query(`SELECT * FROM users;`).then((results) => {
      return results.rows;
    });
  };

  exports.fetchCommentsByArticleId = (article_id) => {
  return db.query(`SELECT comments.article_id, comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body
  FROM comments
  JOIN articles ON articles.article_id = comments.article_id WHERE articles.article_id = $1
  `, [article_id]).then((results) => {
    if (!results.rows[0]) {
      return Promise.reject({
        status: 404,
        msg: `No article found for article_id: ${article_id}`,
      });
    }
    return results.rows;
  });
};

exports.insertComment = (username, body, id) => { 
      return db.query(`INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;`,[body, username, id]).then(({ rows }) => {
        return rows[0]
        })
          }