/*
    ###############################################################################################
    NAME: index.js
    DESCRIPTION: INITIAL FILE OF THE APP
    REVIEW BY: JOSE MANUEL BADILLA PORRAS 03/30/2020
    ###############################################################################################
*/
'use strict'

var app = require('./app');
var port = process.env.PORT || 3977;

//Database connections
var connsql = require('./conn/conn.sql.efoodAdmin');

app.listen(port, function(){
  console.log('successful -> http://localhost:' + port);
});
