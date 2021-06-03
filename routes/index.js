const express = require('express');

const router = express.Router();

const estadosController = require('../controllers/EstadosController');

module.exports = function(){
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
    return router;

}