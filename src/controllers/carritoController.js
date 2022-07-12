
const { response } = require('express')
//const { carrito } = require('../models/carritoModel')
const { carrito } = require('../daos/CarritosDaoMongo')
//const { carrito } = require('../daos/CarritosDaoFirestore')
module.exports = {
    create: (request, response) => {

        carrito.saveCarrito({})
            .then((e) => response.status(200).json({ message: 'Carrito creado exitosamente' }))

    },
    delete: (request, response) => {
        carrito.deleteById(Number(request.params.id))
            .then((e) => response.status(200).json({ message: 'Carrito borrado exitosamente' }))
            .catch((e) => response.status(404).json({ error: 'Error en borrado del carrito' }))

    },
    getById: (request, response) => {
        let id = request.params.id
        carrito.getById(id)
            .then((p) => response.status(200).json(p))
            .catch((e) => res.status(400).json({ error: 'producto no encontrado getall' }))
    },

    addProd: (request, response) => {
        try {
            let id = request.params.id
            let arrProd = request.body
            carrito.addProd(id, arrProd)
            return response.status(200).json({ carrito: arrProd, message: 'Producto agregado' })
        } catch (error) {
            return response.status(404).json({ error: 'Producto no agregado' })
        }

    },

    deleteByIdProd: (request, response) => {
        carrito.deleteByIdProd(Number(request.params.id), Number(request.params.id_prod))
            .then((e) => response.status(200).json({ message: 'Producto borrado exitosamente' }))
            .catch((e) => response.status(404).json({ error: 'Error en borrado del producto' }))

    }
}
