const mongoose = require('mongoose')

const CarritoSchema = new mongoose.Schema({
    timestamp: {
        type: Number,
        required: false,
    },
    productos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    }]
})

module.exports = mongoose.model('Carrito', CarritoSchema); 
