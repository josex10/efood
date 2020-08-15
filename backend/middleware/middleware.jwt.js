'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'C@pris&Intel2020';

exports.ensureAuth = function(req, res, next){
	try {
		if(!req.headers.authorization){
			throw {code: 'ITOKERROR'};
		}
		var token = req.headers.authorization.replace(/['"]+/g, '');
		try{
			var payload = jwt.decode(token, secret);
	
			if(payload.expire <= moment().unix()){
				throw {code: 'ITOKERROR'};
			}
			req.user = payload;
		}catch(ex){
			throw {code: 'ITOKERROR'};
		}
		next();
	} catch (error) {
		if(!error.code){
            error.code = 'SNSYSERROR';
        }
        console.log(error);
        res.status(401).send(error.code);
	}
}


