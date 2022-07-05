const express = require('express')
const {getTopics} = require('./controllers/controller')

const app = express()

app.use(express.json())
app.get('/api/topics', getTopics)

const invalidPath = app.use('*', (req, res) => {
    res.status(404).send({msg: "Invalid path"})
})


const serverError = app.use((err, req, res, next) => {
    res.status(500).send({msg: "internal server error"})
    })

module.exports = app