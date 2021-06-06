//importar de Customers
const Customers = require('../models/Customers');
const Direccion = require('../models/direccion');

//acciones 

//agregar Clientes es decir POST
exports.add = async (req, res) => {
    console.log(req.body); //Mostrar datos recibidos No se recomienda solo para ver que acciones ha echo

    //crear un cliente
    const customer = new Customers(req.body);
    try {
        //Guardar el cliente 
        await customer.save();
        //devolver respuesta
        res.json({
            message: 'Se ha agregado al nuevo cliente'
        });
    } catch (error) {
        console.log(error)
        res.json({
            message: 'No se guardo el cliente'
        });
        
        next();
    }
};

//listar cliente
exports.list = async (req, res, next) => {
    try{
        const customers = await Customers.findAll({
            include: [{model: Direccion},]
        });
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.json({mensaje: 'Error al leer los clientes'});
        next();
    }
};

//Get : /customers/:id << Parametro que vamos a esperar
//Obtener un cliente por ID (SHOW)
exports.show = async (req, res, next) => {
    try {
        const customers = await Customers.findByPk(req.params.id);
        if (!customers) {
            res.status(404).json({ mensaje: 'No se encontró al cliente.'});
        } else {
            res.json(customers);
        } 
    } catch (error) {
            res.status(503).json({ mensaje: 'Error al leer los clientes.'});
        }
};

//Put, actualizar cliente
exports.update = async (req, res, next) => {
    try {
        const customers = await Customers.findByPk(req.params.id);
        if (!customers) {
            res.status(404).json({ mensaje: 'No se encontro al cliente.'});
        } else {
            Object.keys(req.body).forEach((propiedad) => {
                customers[propiedad] = req.body[propiedad];
            });

            customers.save();
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
            mensaje: 'Error al actualizar al cliente',
            errores,
        });
    }
};

//eliminar cliente
exports.delete = async(req, res) => {
    try {
        const customers = await Customers.findByPk(req.params.id);
        if (!customers) {
            res.status(404).json({ mensaje: 'No se encontro al cliente. '});
        } else {
            await customers.destroy();  
            res.json({ mensaje: 'El cliente fue eliminado.' });
        }
    } catch (error) {
        res.status(503).json({ mensaje: 'Error al eliminar al cliente.'});
    }
};
