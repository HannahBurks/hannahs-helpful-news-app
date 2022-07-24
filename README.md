
Welcome to my news repo! Here you will find a news API in which you can view information on articles, users, topics and any comments surrounding this. Multiple paths are accessible, allowing you to GET data, POST data, DELETE data and PATCH/amend data.

In order to get things up and running, any developers will firstly need to do the following
- Fork this repository and clone it to your device.
- Install all dependencies by running 'npm install'
- You will then need to seed the data base by running 'npm run seed'
- All Node modules must be installed.
- 2 x .env files will need to be created. (.env.test and .env.development) In these you will need to add the two databases by writing the following. 
.env.test 
PGDATABASE=nc_news_test 
.env.development 
PGDATABASE=nc_news
- To run tests you will need to run 'npm run test'

Here you can find the following link to the hosted version on Heroku:
https://git.heroku.com/hannybees-news-app.git/api + the path you wish to search (Paths can be found within the endpoints.json)


Recommendations for running:
 node 16.16.0, npm version: 8.11.0