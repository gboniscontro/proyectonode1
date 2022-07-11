const { ContainerFirestore } = require('../contenedores/ContainerFirestore')

class ProductoDaoFirestore extends ContainerFirestore {
  constructor() {
    super('Productos')
    this.id = 0
    this.checkId()
  }

  // Chequea para obtener el ultimo ID y asignarlo al id local (this.id)
  async checkId() {
    let Productos = await this.getAll()

    if (Productos.length > 0) {

      this.id = parseInt(Productos[Productos.length - 1].id) + 1
    }
  }

  saveProducto(Producto) {
    if (Producto) {
      console.log(Producto)
      this.save(Producto, this.id)
      // console.log(this.id)
      this.id++
      return Producto
    } else {
      return 'Not saved'
    }
  }

  updateProducto(Producto, id) {
    if (Producto) {
      console.log(Producto)
      this.update(Producto, id)
      return Producto
    } else {
      return 'Not updated'
    }
  }
}

module.exports = { ProductoDaoFirestore }
