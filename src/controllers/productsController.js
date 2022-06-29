
const { response } = require('express')
const { productos } = require('../models/productsModel')


module.exports = {
    getAll: (request, response) => {
        productos.getAll()
            .then((p) => response.status(200).json(p))
            .catch((e) => res.status(400).json({ error: 'producto no encontrado getall' }))
    },
    getById: (request, response) => {
        let id = request.params.id
        productos.getById(id)
            .then((p) => response.status(200).json(p))
            .catch((e) => res.status(400).json({ error: 'producto no encontrado getall' }))
    },
    create: (request, response) => {
        let producto = request.body
        console.log(producto)
        productos.save(producto)
            .then((e) => response.status(201).json(producto))

    },
    update: (request, response) => {
        try {
            let id = request.params.id
            let producto = request.body

            for (let i = 0; i < productos.productos.length; i++)
                if (productos.productos[i].id == id) {
                    productos.productos[i] = producto
                    productos.productos[i].id = id
                    return response.status(200).json(producto)
                }
            return response.status(404).json({ error: 'Producto no encontrado' })
        } catch (error) {
            return response.status(404).json({ error: 'Producto no encontrado' })
        }

    },
    delete: (request, response) => {
        productos.deleteById(Number(request.params.id))
            .then((e) => response.status(200).json({ message: 'Producto borrado exitosamente' }))
            .catch((e) => response.status(404).json({ error: 'Error en borrado del producto' }))

    }
}
