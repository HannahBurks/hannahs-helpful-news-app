const db = require("../connection.js");

exports.fetchAllTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((results) => {
    return results.rows;
  });
};

exports.fetchArticles = () => {
  return db.query(`SELECT * FROM articles;`).then((results) => {
    return results.rows;
  });
};

exports.fetchArticlesbyId = (article_id) => {
    
  return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id]).then((results) => {
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
        return rows[0];
    });
    
};