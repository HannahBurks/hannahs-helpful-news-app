const {fetchAllTopics} = require('../models/models')

exports.getTopics = (req, res, next)=> {
    fetchAllTopics().then((topics) => {
    res.status(200).send({topics});
    })
    .catch((err) =>
    console.log(err))
    }