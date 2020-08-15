'use strict'

// **START: REQUIRE DATABASES
var DatabaseSQL = require('../conn/conn.sql.efoodAdmin');
// **END: REQUIRE DATABASES

// MODEL
const Parameter = require('../models/model.parameter');
const User = require('../models/model.user');

// SERVICES
const jwt_service = require('../services/jwt.service');

/*
    ###############################################################################################
    NAME: fnHome
    DESCRIPTION: THIS FUNCTION IS TO TEST THE SERVER/ROUTES/AND CONTROLLERS CONNECTIONS
    PARAMETERS: NONE
    RETURN: JSON -> STRING
    REVIEW BY: JOSE MANUEL BADILLA PORRAS 03/30/2020
    ###############################################################################################
*/
exports.fnHome = function(req, res){
    try{
       res.status(200).json('Hello from API');
    }catch(error){
        if(!error.code){
            error.code = 'SNSYSERROR';
        }
        console.log(error);
        res.status(400).send(error.code);
    }
}


/*
    ###############################################################################################
    NAME: fnTestDataBase
    DESCRIPTION: THIS FUNCTION IS TO TEST THE DATABSE CONNECTION
    PARAMETERS: id, company
    RETURN: JSON -> [{ID: DATA, COMPANY: DATA}]
    REVIEW BY: JOSE MANUEL BADILLA PORRAS 03/30/2020
    ###############################################################################################
*/
exports.fnTestDataBase = function (req, res) {
    try {

        // SET THE DB CONNECTION
        let connSql = new DatabaseSQL();
        let storeProcedure = 'dbo.a01_GetAllUsers';

        // REQUEST THE CONNECTION TO THE DB
        connSql.dbQuery('SELECT * FROM tbRoles', [])
            .then(results => {
                res.status(200).json(results);
            })
            .catch(error => {
                if (!error.code) {
                    error.code = 'SNSYSERROR';
                }
                console.log(error);
                res.status(502).json(error);
            });

    } catch (error) {
        if (!error.code) {
            error.code = 'SNSYSERROR';
        }
        console.log(error);
        res.status(400).send(error.code);
    }
}

/*
    ###############################################################################################
    NAME: fnTestDataBase
    DESCRIPTION: THIS FUNCTION IS TO TEST THE DATABSE CONNECTION
    PARAMETERS: id, company
    RETURN: JSON -> [{ID: DATA, COMPANY: DATA}]
    REVIEW BY: JOSE MANUEL BADILLA PORRAS 03/30/2020
    ###############################################################################################
*/
exports.fnTestDataBaseOld = function(req, res){
    try{

        // SET THE DB CONNECTION
        let connSql = new DatabaseSQL();
        let storeProcedure = 'dbo.a01_GetAllUsers';

        // REQUEST THE CONNECTION TO THE DB
        connSql.dbStoreProcedure(storeProcedure, [])
        .then( results => {
            res.status(200).json(results);
        })
        .catch( error => {
            if(!error.code){
                error.code = 'SNSYSERROR';
            }
            console.log(error);
            res.status(502).json(error);
        }); 
        
    }catch(error){
        if(!error.code){
            error.code = 'SNSYSERROR';
        }
        console.log(error);
        res.status(400).send(error.code);
    }
}

/*
    ###############################################################################################
    NAME: fnTestLoginUser
    DESCRIPTION: CHECK THE EMAIL AND PWD OF THE USER
    PARAMETERS: Email, Password
    RETURN: Single User Model / Token
    REVIEW BY: JOSE MANUEL BADILLA PORRAS 03/31/2020
    ###############################################################################################
*/
exports.fnTestLoginUser = function(req, res){
    try{

        // **START: CHECKING ERRORS
        req.checkBody("email").exists().trim().notEmpty();
        req.checkBody("password").exists().trim().notEmpty();

        let checkError = req.validationErrors();
        if(checkError){
            throw {code: 'PSYSERROR'};
        }

        // BUILD PARAMETERS
        const user = new User(0, req.body.email, '', req.body.password);
        const email_parameter = new Parameter('a01_email', user.getEmail());
        const password_parameter = new Parameter('a01_password', user.getPassword());
        const parameters = [email_parameter.getParameter(), password_parameter.getParameter()];



        // SET THE DB CONNECTION
        let connSql = new DatabaseSQL();
        let storeProcedure = 'dbo.a01_Login';

        // REQUEST THE CONNECTION TO THE DB
        connSql.dbStoreProcedure( storeProcedure, parameters)
        .then( results => {
            if(results.recordset && results.recordset.length > 0 && results.rowsAffected.length > 0){
                res.status(200).json({ user: results.recordset[0], token: jwt_service.createToken()});
            } else {
                throw Error ('UNFERROR'); // USER NOT FOUND ERROR
            }
        })
        .catch( error => {
            if(!error.code){
                error.code = 'SNSYSERROR';
            }
            console.log(error);
            res.status(404).json(error);
        }); 
    }catch(error){
        if(!error.code){
            error.code = 'SNSYSERROR';
        }
        console.log(error);
        res.status(400).send(error.code);
    }
}


/*
    ###############################################################################################
    NAME: fnTestRegisterUser
    DESCRIPTION: ADD NEW USER TO THE DB
    PARAMETERS: Single User Model
    RETURN: Single User Model
    REVIEW BY: JOSE MANUEL BADILLA PORRAS 03/31/2020
    ###############################################################################################
*/
exports.fnTestRegisterUser = function(req, res){
    try{

        // **START: CHECKING ERRORS
        req.checkBody("email").exists().trim().notEmpty();
        req.checkBody("name").exists().trim().notEmpty();
        req.checkBody("password").exists().trim().notEmpty();

        let checkError = req.validationErrors();
        if(checkError){
            throw {code: 'PSYSERROR'};
        }

        // BUILD PARAMETERS
        const user = new User(0, req.body.email, req.body.name, req.body.password);
        const email_parameter = new Parameter('a01_email', user.getEmail());
        const password_parameter = new Parameter('a01_password', user.getPassword());
        const name_parameter = new Parameter('a01_name', user.getName());
        const parameters = [email_parameter.getParameter(), password_parameter.getParameter(), name_parameter.getParameter()];



        // SET THE DB CONNECTION
        let connSql = new DatabaseSQL();
        let storeProcedure = 'dbo.a01_AddNewUser';

        // REQUEST THE CONNECTION TO THE DB
        connSql.dbStoreProcedure( storeProcedure, parameters)
        .then( results => {
            res.status(200).json(results);
        })
        .catch( error => {
            if(!error.code){
                error.code = 'SNSYSERROR';
            }
            console.log(error)
            res.status(502).json(error);
        }); 
        
        
    }catch(error){
        if(!error.code){
            error.code = 'SNSYSERROR';
        }
        console.log(error);
        res.status(400).send(error.code);
    }
}


