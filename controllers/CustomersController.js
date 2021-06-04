//importar de Customers
const Customers = require('../models/Customers');

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
exports.list = async (req, res) => {
    try {
        //obtener todos los clientes
        const customers = await Customers.find({});
        res.json(customers);
    } catch (error){
        console.log(error);
        res.json({
            message: 'Error al leer la lista de clientes'
        });
        next();
    }
};

//Get : /customers/:id << Parametro que vamos a esperar
//Obtener un cliente por ID (SHOW)
exports.show = async (req, res, next) => {
    try{
        //Buscar el cliente por id en bd
        const customer = await Customers.findById(req.params.id);
        if (!customer) { //Si no hay cliente
            res.json({
                message: 'El cliente no existe!'
            });

            next(); // Pasar a el siguiente request, continuar con el flujo
        }

        //Retornar el cliente
        res.json(customer);
    } catch (error) {
        console.log(error);
        res.json({
            message: 'Error al procesar la solicitud'
        });
        next();
    }
};

//Put, actualizar cliente
exports.update = async (req, res, next) => {
    try {
        //Buscar y actualizar
        const customer = await Customers.findOneAndUpdate(
        { _id: req.params.id},
        req.body, // actualizar con datos recibidos
        {new: true } //retorne el objeto actualizado
    );

    res.json({
        message: 'Cliente actualizado correctamente'
    });
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

//eliminar cliente
exports.delete = async(req, res) => {
    try{
        //buscar y eliminar por id
        await Customers.findOneAndDelete({_id: req.params.id});
        res.json({
            message: 'Se ha eliminado un cliente'
        });
    } catch (error){
        console.log(error);
        res.json({
            message: 'Error al procesar la solicitud'
        });
        next();
    }
};