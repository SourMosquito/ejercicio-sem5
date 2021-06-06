const Direccion = require('../models/direccion');
const Localidad = require('../models/localidad');

exports.agregar = async (req, res, next) => {
    try{
        await Direccion.create(req.body);
        res.json({mensaje: 'Se agrego la dirección.'});
    }catch (error) {
        console.error(error);
        res.json({mensaje: 'Error al agregar dirección'});
    }
};

exports.listar = async (req, res, next) => {
    try{
        const direcciones = await Direccion.findAll({
            include: [{model: Localidad},]
        });
        res.json(direcciones);
    } catch (error) {
        console.error(error);
        res.json({mensaje: 'Error al leer las direcciones'});
        next();
    }
};

exports.mostrar = async (req, res, next) => {
    try {
        const direcciones = await Direccion.findByPk(req.params.id);
        if (!direcciones) {
            res.status(404).json({ mensaje: 'No se encontró la dirección.'});
        } else {
            res.json(direcciones);
        } 
    } catch (error) {
            res.status(503).json({ mensaje: 'Error al leer las direcciones.'});
        }
};

exports.actualizar = async (req, res, next) => {
    try {
        const direcciones = await Direccion.findByPk(req.params.id);
        if (!direcciones) {
            res.status(404).json({ mensaje: 'No se encontro la dirección.'});
        } else {
            Object.keys(req.body).forEach((propiedad) => {
                direcciones[propiedad] = req.body[propiedad];
            });

            direcciones.save();
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
            mensaje: 'Error al actualizar la direccion',
            errores,
        });
    }
};

exports.eliminar = async (req, res, next) => {
    try {
        const direcciones = await Direccion.findByPk(req.params.id);
        if (!direcciones) {
            res.status(404).json({ mensaje: 'No se encontro la dirección. '});
        } else {
            await direcciones.destroy();  
            res.json({ mensaje: 'La dirección fue eliminada.' });
        }
    } catch (error) {
        res.status(503).json({ mensaje: 'Error al eliminar la dirección.'});
    }
};