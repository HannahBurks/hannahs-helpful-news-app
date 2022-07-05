const seed = require('../db/seeds/seed.js');
const data = require('../db/data/test-data')
const db = require('../db/connection.js');
const request = require('supertest');
const app = require('../db/app.js');


beforeEach(() => {
    return seed(data);
  });
  
  afterAll(() => db.end());

  describe('nc news',() => {
    describe('Get /api/topics', () => {
      test('Responds with 200 and array of topics', () => {
return request(app).get("/api/topics").expect(200).then(({body: {topics}}) => {
    topics.forEach((topic) => {
  expect(topic).toHaveProperty("description")
  expect(topic).toHaveProperty("slug")

        })})
        
        
  })
  test('Responds with 404 when given a path that does not exist ie: /api/tropics', () => {
    return request(app).get("/api/tropics").expect(404).then(({body: {msg}}) => {
        expect(msg).toBe("Invalid path")
    })})

})})
