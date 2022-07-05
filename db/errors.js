const res = require('express/lib/response');


exports.customErr = (err, req, res, next) => {
    if(err.status && err.msg) {
            res.status(err.status).send({ msg: err.msg })
    } else next(err);
    };
    
    exports.emptyPatch = (err,req,res,next)=> {
        if (err.code === '23502') {
          res.status(400).send({ msg: "missing required fields" });
        } else next(err);
      };
    
      exports.stringInsteadOfNumber = (err, req, res, next) => {
        if (err.code === '22P02') {
          res.status(400).send({ msg: "Incorrect type - this must be a number" });
        } else next(err);
      };
    
      exports.invalidPath = (req, res) => {
      res.status(404).send({ msg: "Invalid path" });
    };
    
    exports.serverError = (err, req, res, next) => {
      res.status(500).send({ msg: "internal server error" });
    };