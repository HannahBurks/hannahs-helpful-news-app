const res = require('express/lib/response');


exports.customErr = (err, req, res, next) => {
    if(err.status && err.msg) {
            res.status(err.status).send({ msg: err.msg })
    } else next(err);
    };
    
    exports.emptyPatchOrPost = (err,req,res,next)=> {
        if (err.code === '23502' && Object.keys(req.body).length === 0) {
          res.status(400).send({ msg: "missing required fields" });
        } else next(err); 
      };

      exports.failingSchema = (err,req,res,next)=> {
        if (err.code === '23502' && Object.keys(req.body).length > 1) {
          res.status(400).send({ msg: "failing Schema, please check your inputs" });
        } else next(err); 
      };

      exports.noUser = (err,req,res,next)=> {
        if(err.code === '23503' && err.constraint === 'comments_author_fkey'){res.status(404).send({ msg: "Username does not exist" });
      } else next(err);
    };

    exports.noArticleId= (err,req,res,next)=> {
      if(err.code === '23503' && err.constraint === 'comments_article_id_fkey'){res.status(404).send({ msg: "Article ID does not exist" });
    } else next(err);
  };

      exports.stringInsteadOfNumber = (err, req, res, next) => {
        if (err.code === '22P02' || err.code === '42601') {
          res.status(400).send({ msg: "Incorrect type - this must be a number" });
        } else next(err);
      };
    
      exports.invalidPath = (req, res) => {
      res.status(404).send({ msg: "Invalid path" });
    };
    
    exports.serverError = (err, req, res, next) => {
      console.log(err)
      res.status(500).send({ msg: "internal server error" });
    };