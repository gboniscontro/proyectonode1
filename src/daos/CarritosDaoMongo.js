const ContainerMongo = require('../containers/ContainerMongo')
const CarritoModel = require('../models/carritos')

class CarritoDaoMongo extends ContainerMongo {
	constructor() {
		super(CarritoModel)
	}

	async saveCarrito(Carrito) {
		await this.save(Carrito)
		return Carrito
	}

	async getById(id) {
		try {
			for (let i = 0; i < this.carritos.length; i++)
				if (this.carritos[i].id == id)
					return this.carritos[i].productos
			return null
		} catch (error) {
			console.log('No funciono getbyid ', id)
		}
	}
	async create() {
		try {
			let maxid = 0

			this.carritos.forEach(
				({ id }) => (maxid = maxid > id ? maxid : id))
			let carrito = new Carrito(++maxid)
			this.carritos.push(carrito)
			fs.promises.writeFile(this.name, JSON.stringify(this.carritos, null, 2))
				.then(
					() =>
						console.log(`El carrito con ID ${carrito.id} ha sido guardado`)
				)
				.catch(
					(e) => console.log(e)
				)

		} catch (error) {
			console.log('error funcion save')
		}
	}
	async addProd(id, arrProd) {
		try {
			let maxid = 0
			this.carritos.forEach(
				(c) => {
					if (c.id == id) {
						c.productos.push(...arrProd)
					}
				}
			)
			await doc.save();




		} catch (error) {
			console.log('error funcion addprod')
		}
	}
	async deleteByIdProd(id, idprod) {
		try {
			this.carritos.forEach((element) => {
				if (element.id == id) {
					//console.log(element.id, 'idcarrito', idprod, element.productos)
					element.productos.forEach((el, ind) => {
						// console.log('-', el, idprod, el.id == idprod)
						if (el == idprod) {
							element.productos.splice(ind, 1)
							//console.log(el.id, 'borradoproducto')
						}
					}
					)
				}
			});
			console.log(`Eliminado id ${id} idprod${idprod}:`)
			await fs.promises.writeFile(this.name, JSON.stringify(this.carritos, null, 2))
			console.log(`El carrito con IDprod ${idprod} ha sido eliminado`)


		} catch (error) {
			console.log(`No se pudo borrar el carrito y idprod  ${id}`)
		}
	}
	async deleteById(id) {
		try {
			this.carritos.forEach((element, index) => {
				if (element.id == id) this.carritos.splice(index, 1)
			});
			console.log(`Eliminado id ${id}:`)
			await fs.promises.writeFile(this.name, JSON.stringify(this.carritos, null, 2))
			console.log(`El carrito con ID ${id} ha sido eliminado`)


		} catch (error) {
			console.log(`No se pudo borrar el  ${id}`)
		}
	}


}
const carrito = new CarritoDaoMongo()
module.exports = { carrito, CarritoDaoMongo }
