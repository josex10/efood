'use strict'

/*
    ########################################################################
    SECTION: IMPORT REQUIRED LIBRIARIES
    ########################################################################
*/
var express = require('express');
var controllerLogin = require('../controllers/controller.login');

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
api.post('/login', controllerLogin.fnLogin);



/*
    ########################################################################
    SECTION: EXPORTS VARIABLES AND FUNCTIONS
    ########################################################################
*/

module.exports = api;