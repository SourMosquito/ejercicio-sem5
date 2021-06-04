const express = require('express');

const router = express.Router();

const estadosController = require('../controllers/EstadosController');
const municipiosController = require('../controllers/MunicipiosController');
const localidadesController = require('../controllers/LocalidadesController');

module.exports = function(){
    //Estados
    //post: agregar
    router.post('/estados', estadosController.agregar);
    //get: leer
    router.get('/estados', estadosController.listar);
    //get: leer por id
    router.get('/estados/:id', estadosController.mostrar);
    //put: actualizar
    router.put('/estados/:id', estadosController.actualizar);
    //delete: eliminar
    router.delete('/estados/:id', estadosController.eliminar);

    //Municipios
    router.post('/municipios', municipiosController.agregar);
    router.get('/municipios', municipiosController.listar);
    router.get('/municipios/:id', municipiosController.mostrar);
    router.put('/municipios/:id', municipiosController.actualizar);
    router.delete('/municipios/:id', municipiosController.eliminar);

    //localidades
    router.post('/localidades', localidadesController.agregar);
    router.get('/localidades', localidadesController.listar);
    router.get('/localidades/:id', localidadesController.mostrar);
    router.put('/localidades/:id', localidadesController.actualizar);
    router.delete('/localidades/:id', localidadesController.eliminar);

    return router;

}