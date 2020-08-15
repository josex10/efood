/*
    ###############################################################################################
    NAME: conn.sql.js
    DESCRIPTION: CONNECTION TO THE DB
    REVIEW BY: JOSE MANUEL BADILLA PORRAS 03/30/2020
    ###############################################################################################
*/
'use strict'

const sql = require('mssql');



function DatabaseSQL(){
    this.config = {
        user: 'test',
        password: 'test',
        server: 'localhost',
        database: 'dbSistemaAdministracionEfood', 
        options: {
            // trustedConnection: true
            enableArithAbort: true,
            encrypt: false
        }
        
    }
}

DatabaseSQL.prototype.dbQuery = function(sqlQuery, parameters){
    return new Promise( ( resolve, reject ) => {
        
        // VARIABLE TO STORE THE DB RESULT
        var tmpResult;

        // START THE DB CONNECTION
        sql.connect(this.config).then(pool => {

            // CREATE THE REQUEST
            var request = pool.request();
            
            // ADD THE INPUT INTO THE REQUEST
            if(parameters.length > 0){
                parameters.forEach(element => {
                    request.input(element.name, element.value);
                });
            }
            // ADD THE QUERY TO THE REQUEST / EXCECUTE THE REQUEST
            return request.query(sqlQuery);
        }).then(result => {
            // STORE THE RESULTS
            tmpResult = result;
            
            // CLOSE THE DB CONNECTION
            return sql.close();
        }).then(() =>{

            // RETURN THE DB RESULTS
            resolve( tmpResult );
        }).catch(err => {
            // RETURN THE DB ERROR
            return reject( {code: 'DB2ERROR', message: err} );
        });
    } );
}

DatabaseSQL.prototype.dbStoreProcedure = function(sqlStoreProcedure, parameters){
    return new Promise( ( resolve, reject ) => {
        
        // VARIABLE TO STORE THE DB RESULT
        var tmpResult;

        // START THE DB CONNECTION
        sql.connect(this.config).then(pool => {

            // CREATE THE REQUEST
            var request = pool.request();
            
            // ADD THE INPUT INTO THE REQUEST
            if(parameters.length > 0){
                parameters.forEach(element => {
                    request.input(element.name, element.value);
                });
            }
            // ADD THE QUERY TO THE REQUEST / EXCECUTE THE REQUEST
            return request.execute(sqlStoreProcedure);
        }).then(result => {
            // STORE THE RESULTS
            tmpResult = result;
            
            // CLOSE THE DB CONNECTION
            return sql.close();
        }).then(() =>{

            // RETURN THE DB RESULTS
            resolve( tmpResult );
        }).catch(err => {
            // RETURN THE DB ERROR
            return reject( {code: 'DB2ERROR', message: err} );
        });
    } );
}

module.exports = DatabaseSQL;