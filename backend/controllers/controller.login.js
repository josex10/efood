'use strict'

// **START: REQUIRE DATABASES
var DatabaseSQL = require('../conn/conn.sql.efoodAdmin');
// **END: REQUIRE DATABASES

// MODEL
const Usuario = require('../models/mode.usuario');
const Parameter = require('../models/model.parameter');


/**
 * @description Funcion para el ingreso en el app
 * @param {any} req Parametro donde recibimos la informacion
 * @param {any} res Parametro donde se envia la informacion solicitada o error
 */
exports.fnLogin = function (req, res) {
    try {

        // Validamos los parametros
        req.checkBody("loginUsuario").exists().trim().notEmpty();
        req.checkBody("passwordUsuario").exists().trim().notEmpty();

        let checkError = req.validationErrors();
        if (checkError) {
            throw { code: 'PSYSERROR' };
        }

        var tmpUsuario = new Usuario(req.body.loginUsuario, req.body.passwordUsuario);
        const parametroLogin = new Parameter('loginUsuario', tmpUsuario.getLoginUsuario());
        const parametroPassword = new Parameter('passwordUsuario', tmpUsuario.getPasswordUsuario());

        let connSql = new DatabaseSQL();
        connSql.dbQuery('SELECT * FROM tbUsuarios WHERE loginUsuario =  @loginUsuario  AND passwordUsuario = @passwordUsuario', [parametroLogin, parametroPassword])
            .then(results => {
                if (typeof results.recordset !== 'undefined' && results.recordset.length > 0) {
                    res.status(200).json(results.recordset);
                } else {
                    throw { code: 'LOGINGERROR' };
                }
            })
            .catch(error => {
                if (!error.code) {
                    error.code = 'DBERROR';
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