const mongoose = require('mongoose')

const CarritoSchema = new mongoose.Schema({
    id: { type: Number, required: false },
    timestamp: { type: Number, required: false },
    productos: { type: Array, required: false }
})

module.exports = mongoose.model('carritos', CarritoSchema); 
