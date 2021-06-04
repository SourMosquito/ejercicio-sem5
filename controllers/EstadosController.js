const Estado = require('../models/estado');
const Municipio = require('../models/municipio');

exports.agregar = async (req, res, next) => {
    try{
        await Estado.create(req.body);
        res.json({mensaje: 'Se agrego el estado.'});
    }catch (error) {
        console.error(error);
        res.json({mensaje: 'Error al agregar estado'});
    }
};


exports.listar = async (req, res, next) => {
    try{
        const estados = await Estado.findAll({
           include: [{model: Municipio},]
        });
        res.json(estados);
    } catch (error) {
        console.error(error);
        res.json({mensaje: 'Error al leer los estados'});
        next();
    }
};


exports.mostrar = async (req, res, next) => {
    try {
        const estados = await Estado.findByPk(req.params.id);
        if (!estados) {
            res.status(404).json({ mensaje: 'No se encontró el estado.'});
        } else {
            res.json(estados);
        } 
    } catch (error) {
            res.status(503).json({ mensaje: 'Error al leer el estado.'});
        }
};



exports.actualizar = async (req, res, next) => {
    try {
        const estados = await Estado.findByPk(req.params.id);
        if (!estados) {
            res.status(404).json({ mensaje: 'No se encontro el estado.'});
        } else {
            Object.keys(req.body).forEach((propiedad) => {
                estados[propiedad] = req.body[propiedad];
            });

            estados.save();
            res.json({ mensaje: 'El registro fue actualizado.'})
        }
    } catch (error) {
        let errores = [];
        if (error.errors) {
            errores = error.errors.map((item) => ({
                campo: item.path,
                error: item.message,
            }));
        }

        res.json({
            error: true,
            mensaje: 'Error al actualizar el estado',
            errores,
        });
    }
};

exports.eliminar = async (req, res, next) => {
    try {
        const estados = await Estado.findByPk(req.params.id);
        if (!estados) {
            res.status(404).json({ mensaje: 'No se encontro el estado. '});
        } else {
            await estados.destroy();  
            res.json({ mensaje: 'El estado fue eliminado.' });
        }
    } catch (error) {
        res.status(503).json({ mensaje: 'Error al eliminar el estado.'});
    }
};