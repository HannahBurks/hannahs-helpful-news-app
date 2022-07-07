\c nc_news
INSERT INTO comments (article_id, author, body) VALUES (3,'jessjelly','hi') RETURNING *;
