const db = require('../connection.js')

exports.fetchAllTopics = () => {
   return db.query(`SELECT * FROM topics;`).then((results) => {
       return results.rows
   });

};
