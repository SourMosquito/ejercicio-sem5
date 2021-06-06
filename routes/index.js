const express = require('express');

const router = express.Router();

const estadosController = require('../controllers/EstadosController');
const municipiosController = require('../controllers/MunicipiosController');
const localidadesController = require('../controllers/LocalidadesController');
const CustomersController = require('../controllers/CustomersController');
const DireccionController = require('../controllers/DireccionController');

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

        
    //clientes
    router.post('/clientes', CustomersController.add);
    router.get('/clientes', CustomersController.list);
    router.get('/clientes/:id', CustomersController.show);
    router.put('/clientes/:id', CustomersController.update);
    router.delete('/clientes/:id', CustomersController.delete);

    //direcciones
    router.post('/direcciones', DireccionController.agregar);
    router.get('/direcciones', DireccionController.listar);
    router.get('/direcciones/:id', DireccionController.mostrar);
    router.put('/direcciones/:id', DireccionController.actualizar);
    router.delete('/direcciones/:id', DireccionController.eliminar);


    return router;

}