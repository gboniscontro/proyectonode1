const ContainerMongo = require('../containers/ContainerMongo')
const productModel = require('../models/productos')

class productDaoMongo extends ContainerMongo {
	constructor(){
		super(productModel)
	}

	saveproduct(product){
		this.save(product)	
		return product
	}
	

}
const productos = new productDaoMongo()
module.exports = {productos, productDaoMongo }
