/*
    ###############################################################################################
    NAME: route.template.js
    DESCRIPTION: THIS IS A ROUTE FILE TEMPLATE
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
var controller_template = require('../controllers/controller.template');
var middlewareJwt = require('../middleware/middleware.jwt');

/*
    ########################################################################
    SECTION: FUNCTION AND VARIABLES
    ########################################################################
*/
var api = express.Router();

/*
    ########################################################################
    SECTION: ROUTES
    ########################################################################
*/
api.get('/templateHome', controller_template.fnHome);
api.get('/templateTestDB', controller_template.fnTestDataBase);

api.post('/templateUserLogin', controller_template.fnTestLoginUser);
api.post('/templateUserRegister', middlewareJwt.ensureAuth, controller_template.fnTestRegisterUser);



/*
    ########################################################################
    SECTION: EXPORTS VARIABLES AND FUNCTIONS
    ########################################################################
*/

module.exports = api;