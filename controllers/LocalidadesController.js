const Localidad = require('../models/localidad');
const Municipio = require('../models/municipio');
//const Municipio = require('../models/municipio');

exports.agregar = async (req, res, next) => {
    try{
        await Localidad.create(req.body);
        res.json({mensaje: 'Se agrego la localidad.'});
    }catch (error) {
        console.error(error);
        res.json({mensaje: 'Error al agregar localidad'});
    }
};

exports.listar = async (req, res, next) => {
    try{
        const localidades = await Localidad.findAll({
            include: [{model: Municipio},]
        });
        res.json(localidades);
    } catch (error) {
        console.error(error);
        res.json({mensaje: 'Error al leer las localidades'});
        next();
    }
};

exports.mostrar = async (req, res, next) => {
    try {
        const localidades = await Localidad.findByPk(req.params.id);
        if (!localidades) {
            res.status(404).json({ mensaje: 'No se encontró la localidad.'});
        } else {
            res.json(localidades);
        } 
    } catch (error) {
            res.status(503).json({ mensaje: 'Error al leer las localidades.'});
        }
};

exports.actualizar = async (req, res, next) => {
    try {
        const localidades = await Localidad.findByPk(req.params.id);
        if (!localidades) {
            res.status(404).json({ mensaje: 'No se encontro la localidad.'});
        } else {
            Object.keys(req.body).forEach((propiedad) => {
                localidades[propiedad] = req.body[propiedad];
            });

            localidades.save();
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
            mensaje: 'Error al actualizar la localidad',
            errores,
        });
    }
};

exports.eliminar = async (req, res, next) => {
    try {
        const localidades = await Localidad.findByPk(req.params.id);
        if (!localidades) {
            res.status(404).json({ mensaje: 'No se encontro la localidad. '});
        } else {
            await localidades.destroy();  
            res.json({ mensaje: 'La localidad fue eliminada.' });
        }
    } catch (error) {
        res.status(503).json({ mensaje: 'Error al eliminar la localidad.'});
    }
};