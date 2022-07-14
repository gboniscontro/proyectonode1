const { ContainerFirestore } = require('../containers/ContainerFirestore')
const ObjError = require('../objError');
class CarritoDaoFirestore extends ContainerFirestore {
  constructor() {
    super('Carritos')
  }

  async saveCarrito(item) {
    try {
      item.timestamp = Date.now();
      const id = await this.save(item);
      return id;
    }
    catch (e) {
      throw new ObjError(500, "Error al agregar un carrito a la  base Firestore", e)
    }
  }
  async addProd(id, arrProd) {
    try {
      await this.collection.doc(id).update(
        { productos: arrProd })
      return await this.getById(id)


    } catch (err) {
      console.log(err)
      // throw new ObjError(500, "Error al agregar productos al carrito", err)
    }
  }
  async deleteByIdProd(id, idprod) {
    const carrito = await this.getById(id);
    carrito.productos.pull(idprod);
    await carrito.save();
  }

  async getById(id) {
    try {
      let result = await (await this.collection.doc(id).get()).data()
      return { id: id, ...result };


    } catch (error) {
      throw new ObjError(500, `ERROR getbyid `, error)
    }

  }


}
const carrito = new CarritoDaoFirestore()
module.exports = { carrito }
