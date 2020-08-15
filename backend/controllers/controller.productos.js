'use strict'

// **START: REQUIRE DATABASES
var DatabaseSQL = require('../conn/conn.sql.efoodAdmin');
// **END: REQUIRE DATABASES

// MODEL
const Usuario = require('../models/mode.usuario');
const Parameter = require('../models/model.parameter');


/**
 * @description Funcion para obtener todas las lineas de comida
 * @param {any} req Parametro donde recibimos la informacion
 * @param {any} res Parametro donde se envia la informacion solicitada o error
 */
exports.fnObtenerLineasDeComida = function (req, res) {
    try {
        let connSql = new DatabaseSQL();
        connSql.dbQuery('SELECT * FROM tbLineasDeComida', [])
            .then(results => {
                if (typeof results.recordset !== 'undefined' && results.recordset.length > 0) {
                    res.status(200).json(results.recordset);
                } else {
                    throw { code: 'NOTRESULTS' };
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

/**
 * @description Funcion para realizar busquedas de productos por lineas de comida
 * @param {any} req Parametro donde recibimos la informacion
 * @param {any} res Parametro donde se envia la informacion solicitada o error
 */
exports.fnBuscarProductosPorLineaDeComida = function (req, res) {
    try {

        // Validamos los parametros
        req.checkBody("idLineaDeComida").exists().trim().notEmpty();
        let checkError = req.validationErrors();
        if (checkError) {
            throw { code: 'PSYSERROR' };
        } 

        const parametroIdLineaDeComida = new Parameter('idLineaDeComida', req.body.idLineaDeComida);

        let connSql = new DatabaseSQL();
        const query = 'SELECT tbProductos.* ,(SELECT TOP (1) precio FROM tbProductoPrecios WHERE idProducto = tbProductos.idProductos ORDER BY precio asc) AS precio '+
                        'FROM tbProductos WHERE linea =  @idLineaDeComida';
        connSql.dbQuery(query, [parametroIdLineaDeComida])
            .then(results => {
                if (typeof results.recordset !== 'undefined' && results.recordset.length > 0) {
                    res.status(200).json(results.recordset);
                } else {
                    throw { code: 'NOTRESULTS' };
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


/**
 * @description Funcion para realizar busquedas de productos por linea de comida y/o nombre/descripcion
 * @param {any} req Parametro donde recibimos la informacion
 * @param {any} res Parametro donde se envia la informacion solicitada o error
 */
exports.fnBuscarProductosPorLineaDeComidaNombreDescripcion = function (req, res) {
    try {

        // Validamos los parametros
        req.checkBody("idLineaDeComida").exists().trim().notEmpty();
        req.checkBody("textoValor").exists().trim().notEmpty();
        let checkError = req.validationErrors();
        if (checkError) {
            throw { code: 'PSYSERROR' };
        }

        const parametroIdLineaDeComida = new Parameter('idLineaDeComida', req.body.idLineaDeComida);
        const parametroTextValor = new Parameter('textoValor', req.body.textoValor);

        let connSql = new DatabaseSQL();
        connSql.dbQuery("SELECT top(1) * FROM tbProductos WHERE linea = @idLineaDeComida AND nombre like '%' + @textoValor + '%'; ", [parametroIdLineaDeComida, parametroTextValor])
            .then(results => {
                if (typeof results.recordset !== 'undefined' && results.recordset.length > 0) {
                    res.status(200).json(results.recordset);
                } else {
                    throw { code: 'NOTRESULTS' };
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

/**
 * @description Funcion obtener toda la informacion del producto por ID
 * @param {any} req Parametro donde recibimos la informacion
 * @param {any} res Parametro donde se envia la informacion solicitada o error
 */
exports.fnObtenerProductoPorId = function (req, res) {
    try {

        // Validamos los parametros
        req.checkBody("idProductos").exists().trim().notEmpty();
        let checkError = req.validationErrors();
        if (checkError) {
            throw { code: 'PSYSERROR' };
        }
        
        
        const parametroIdProducto = new Parameter('idProductos', req.body.idProductos);

        console.log(parametroIdProducto);

        let connSql = new DatabaseSQL();
        connSql.dbQuery('SELECT TOP (1) * FROM tbProductos WHERE idProductos =  @idProductos', [parametroIdProducto])
            .then(results => {
                if (typeof results.recordset !== 'undefined' && results.recordset.length > 0) {
                    res.status(200).json(results.recordset);
                } else {
                    throw { code: 'NOTRESULTS' };
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


/**
 * @description Funcion obtener los tipos de precios de un producto en especifico
 * @param {any} req Parametro donde recibimos la informacion
 * @param {any} res Parametro donde se envia la informacion solicitada o error
 */
exports.fnObtenerTiposDePreciosPorIdDeProducto = function (req, res) {
    try {

        // Validamos los parametros
        req.checkBody("idProductos").exists().trim().notEmpty();
        let checkError = req.validationErrors();
        if (checkError) {
            throw { code: 'PSYSERROR' };
        }
        
        
        const parametroIdProducto = new Parameter('idProductos', req.body.idProductos);
        let connSql = new DatabaseSQL();
        const query =   'SELECT tbProductoPrecios.* , tbTiposPrecios.nombre ' +
                        'FROM tbProductoPrecios '+
                        'INNER JOIN tbTiposPrecios ' + 
                        'ON tbTiposPrecios.idTiposPrecios = tbProductoPrecios.tipoPrecio ' + 
                        'WHERE idProducto =  @idProductos';
        connSql.dbQuery(query, [parametroIdProducto])
            .then(results => {
                if (typeof results.recordset !== 'undefined' && results.recordset.length > 0) {
                    res.status(200).json(results.recordset);
                } else {
                    throw { code: 'NOTRESULTS' };
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


/**
 * @description Funcion para validar codigo de descuento
 * @param {any} req Parametro donde recibimos la informacion
 * @param {any} res Parametro donde se envia la informacion solicitada o error
 */
exports.fnValidarCodigoDescuento = function (req, res) {
    try {

        // Validamos los parametros
        req.checkBody("idTiqueteDescuento").exists().trim().notEmpty();
        let checkError = req.validationErrors();
        if (checkError) {
            throw { code: 'PSYSERROR' };
        }
        
        
        const parametroDescuento = new Parameter('idTiqueteDescuento', req.body.idTiqueteDescuento);
        let connSql = new DatabaseSQL();
        const query =   'SELECT * FROM tbTiquetesDeDescuento WHERE idTiqueteDescuento = @idTiqueteDescuento';
        connSql.dbQuery(query, [parametroDescuento])
            .then(results => {
                if (typeof results.recordset !== 'undefined' && results.recordset.length > 0) {
                    res.status(200).json(true);
                } else {
                    throw { code: 'CODDESCINVALID' };
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

