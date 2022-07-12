const { ContainerFirestore } = require('../containers/ContainerFirestore')

class CarritoDaoFirestore extends ContainerFirestore {
  constructor() {
    super('Carritos')
    this.id = 0
    this.checkId()
  }

  // Chequea para obtener el ultimo ID y asignarlo al id local (this.id)
  async checkId() {
    let Carritos = await this.getAll()

    if (Carritos.length > 0) {

      this.id = parseInt(Carritos[Carritos.length - 1].id) + 1
    }
  }

  saveCarrito(Carrito) {
    if (Carrito) {
      console.log(Carrito)
      this.save(Carrito, this.id)
      // console.log(this.id)
      this.id++
      return Carrito
    } else {
      return 'Not saved'
    }
  }

  updateCarrito(Carrito, id) {
    if (Carrito) {
      console.log(Carrito)
      this.update(Carrito, id)
      return Carrito
    } else {
      return 'Not updated'
    }
  }
}

module.exports = { CarritoDaoFirestore }
