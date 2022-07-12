const ContainerMongo = require('../containers/ContainerMongo')
const productModel = require('../models/productos')

class productDaoMongo extends ContainerMongo {
	constructor() {
		super(productModel)
	}

	async saveProduct(item) {
		try {
			item.timestamp = Date.now();
			const id = await this.save(item);
			return id._id;
		}
		catch (error) {
			console.log(`Hubo un error "${error}"`)
		}
	}

	async addProducts(products) {
		try {
			for (const p of products) {
				await this.saveProduct(p);
			}
		}
		catch (e) {
			console.log(`Hubo un error al actualizar el carrito: "${e}"`)
		}
	}



}
const productos = new productDaoMongo()
module.exports = { productos, productDaoMongo }
