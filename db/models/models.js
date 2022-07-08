const db = require("../connection.js");
const { getTopics } = require("../controllers/controller.js");
const articles = require("../data/test-data/articles.js");
const users = require("../data/test-data/users.js");

exports.fetchAllTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((results) => {
    return results.rows;
  });
};

exports.fetchArticles = async (sortby = 'created_at', order = 'DESC', filteredtopic) => {

  const sortedByOptions = ['created_at', 'title', 'article_id','topic', 'author', 'body', 'votes']
  if (order !== 'DESC' && order !== 'ASC'){
    return Promise.reject({ status: 400, msg: 'bad request - order not valid - must be ASC or DESC' });
    }
  if (sortedByOptions.includes(sortby) === false){
    return Promise.reject({ status: 400, msg: 'bad request - sort by catagory does not exist' });
  }
  const queryValues = []
  let string = `SELECT articles.* , COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments on comments.article_id = articles.article_id`;
  if(filteredtopic){
   const checkingArticles = await db.query(
      `SELECT * FROM articles WHERE articles.topic = $1;`,[filteredtopic])
  const checkingTopics = await db.query(`SELECT * FROM topics WHERE topics.slug = $1;`,[filteredtopic])
  if (checkingArticles.rows.length === 0 && checkingTopics.rows.length >= 1) {
    return checkingArticles.rows;
    } 
  if (checkingArticles.rows.length === 0 && checkingTopics.rows.length === 0) {
    return Promise.reject({ status: 404, msg: 'topic not found' })
  } else {
  string += ` WHERE articles.topic = $1 `;
  queryValues.push(filteredtopic)
    }
  }
  string += ` GROUP BY articles.article_id ORDER BY articles.${sortby} ${order};`
    return db.query(string, queryValues).then((results) => {
      return results.rows;})
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