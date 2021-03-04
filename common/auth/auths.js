const config = require('../config/env.config.js');

exports.admin = (req,res,next) => {
    if (req.header('Auth-Key') != config.AdminAuthKey) {
        res.status(401).send();
        return;
    }else{
        next()
    }
}