/*
    ###############################################################################################
    NAME: jwt.service.js
    DESCRIPTION: CREATE TOKENS
    REVIEW BY: JOSE MANUEL BADILLA PORRAS 03/30/2020
    ###############################################################################################
*/
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'C@pris&Intel2020';

exports.createToken = function(){
	var payload = {
		name: "Intel-jwt-token",
		create : moment().unix(),
		expire: moment().add(60, 'minutes').unix()
	}
	return jwt.encode(payload, secret);
}


