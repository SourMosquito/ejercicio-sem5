const Estado = require('../models/Estado');
const Localidad = require('../models/localidad');
const Municipio = require('../models/municipio');


exports.agregar = async (req, res, next) => {
    try{
        await Municipio.create(req.body);
        res.json({mensaje: 'Se agrego el municipio.'});
    }catch (error) {
        console.error(error);
        res.json({mensaje: 'Error al agregar municipio'});
    }
};


exports.listar = async (req, res, next) => {
    try{
        const municipios = await Municipio.findAll({
            include: [{model: Estado}, {model: Localidad}]
        });
        res.json(municipios);
    } catch (error) {
        console.error(error);
        res.json({mensaje: 'Error al leer los municipios'});
        next();
    }
};

exports.mostrar = async (req, res, next) => {
    try {
        const municipios = await Municipio.findByPk(req.params.id);
        if (!municipios) {
            res.status(404).json({ mensaje: 'No se encontró el municipio.'});
        } else {
            res.json(municipios);
        } 
    } catch (error) {
            res.status(503).json({ mensaje: 'Error al leer el municipio.'});
        }
};

exports.actualizar = async (req, res, next) => {
    try {
        const municipios = await Municipio.findByPk(req.params.id);
        if (!municipios) {
            res.status(404).json({ mensaje: 'No se encontro el municipio.'});
        } else {
            Object.keys(req.body).forEach((propiedad) => {
                municipios[propiedad] = req.body[propiedad];
            });

            municipios.save();
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
            mensaje: 'Error al actualizar el municipio',
            errores,
        });
    }
};

exports.eliminar = async (req, res, next) => {
    try {
        const municipios = await Municipio.findByPk(req.params.id);
        if (!municipios) {
            res.status(404).json({ mensaje: 'No se encontro el municipio. '});
        } else {
            await municipios.destroy();  
            res.json({ mensaje: 'El municipio fue eliminado.' });
        }
    } catch (error) {
        res.status(503).json({ mensaje: 'Error al eliminar el municipio.'});
    }
};