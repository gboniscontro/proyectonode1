
const { response } = require('express')
//const { productos } = require('../models/productsModel')
const { productos } = require('../daos/ProductosDaoMongo')


module.exports = {
    getAll: (request, response) => {
        productos.getAll()
            .then((p) => response.status(200).json(p))
            .catch((e) => {
                console.log(e)
                response.status(400).json({ message: e, error: 'producto no encontrado getall' })
            })
    },
    getById: (request, response) => {
        let id = request.params.id
        productos.getById(id)
            .then((p) => response.status(200).json(p))
            .catch((e) => response.status(400).json({ error: 'producto no encontrado getall' }))
    },
    create: (request, response) => {
        let producto = request.body
        console.log(producto)
        productos.addProducts(producto)
            .then((e) => response.status(201).json(producto))

    },
    update: (request, response) => {
        try {

            let id = request.params.id
            let producto = request.body
            productos.updateById(id, producto)
                .then((e) => response.status(201).json(producto))


        } catch (error) {
            return response.status(404).json({ error: 'Producto no encontrado' })
        }

    },
    delete: (request, response) => {
        productos.deleteById(request.params.id)
            .then((e) => response.status(200).json({ message: 'Producto borrado exitosamente' }))
            .catch((e) => response.status(404).json({ error: 'Error en borrado del producto' }))

    }
}
