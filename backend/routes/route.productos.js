'use strict'

/*
    ########################################################################
    SECTION: IMPORT REQUIRED LIBRIARIES
    ########################################################################
*/
var express = require('express');
var controllerProductos = require('../controllers/controller.productos');

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
api.get('/obtenerLineasDeComida', controllerProductos.fnObtenerLineasDeComida);

api.post('/busquedaProductosPorLineaDeComida', controllerProductos.fnBuscarProductosPorLineaDeComida);
api.post('/busquedaProductosPersonalizada', controllerProductos.fnBuscarProductosPorLineaDeComidaNombreDescripcion);
api.post('/obtenerProductoPorId', controllerProductos.fnObtenerProductoPorId);
api.post('/obtenerTiposDePrecioPorProductoId', controllerProductos.fnObtenerTiposDePreciosPorIdDeProducto);
api.post('/validarCodigoDescuento', controllerProductos.fnValidarCodigoDescuento);

/*
    ########################################################################
    SECTION: EXPORTS VARIABLES AND FUNCTIONS
    ########################################################################
*/

module.exports = api;