/*
    ###############################################################################################
    NAME: app.js
    DESCRIPTION: ON THIS FILE ALL THE STRUCTURE OF THE APP IS HANDLED
    REVIEW BY: JOSE MANUEL BADILLA PORRAS 03/30/2020
    ###############################################################################################
*/
'use strict'

/*
    ########################################################################
    SECTION: IMPORT REQUIRED LIBRIARIES
    ########################################################################
*/

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var validator = require('express-validator');
/*
    ########################################################################
    SECTION: ROUTES
    ########################################################################
*/
var route_template = require('./routes/route.template');
var routeLogin = require('./routes/route.login');
var routeProductos = require('./routes/route.productos');

/*
    ########################################################################
    SECTION: FUNCTION AND VARIABLES
    ########################################################################
*/

/*
    DESCRIPTION: INITIALICE EXPRESS MODULE
*/
var app = express();

/*
    DESCRIPTION: SETTING THE APP
*/
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.locals.delimiters = '<% %>';
app.set('view engine', 'ejs');
app.use(validator());


/*
    DESCRIPTION: SETTING THE HEADERS
*/
app.use(cors());
app.use(function timeLog(req, res, next) {
        try{
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type', 'authorization');
        }catch(ex){
            return res.status(404).send({message: 'Problemas con los  headers'});
        }
    next();
});

/*
    DESCRIPTION: LOAD ROUTES
*/

app.use('/api', route_template);
app.use('/api', routeLogin);
app.use('/api', routeProductos);



/*
    ########################################################################
    SECTION: EXPORTS VARIABLES AND FUNCTIONS
    ########################################################################
*/
module.exports = app;