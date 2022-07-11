const mongoose = require('mongoose')

const ProductoSchema = new mongoose.Schema({
	title: { type: String, required: true, max: 100 },
	thumbnail: { type: String, required: false, max: 200 },
	price: { type: Number, required: true }
})

module.exports = mongoose.model('productos', ProductoSchema); 
