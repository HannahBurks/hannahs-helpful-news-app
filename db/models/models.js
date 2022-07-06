const db = require("../connection.js");

exports.fetchAllTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((results) => {
    return results.rows;
  });
};

exports.fetchArticles = () => {
  return db.query(`SELECT articles.* , COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments on comments.article_id = articles.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;`).then((results) => {
    return results.rows;
  });
};

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
      console.log(article_id)
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