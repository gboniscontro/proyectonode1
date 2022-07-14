
global.ADMINISTRADOR = true;

const logger = require('./logger')

const express = require('express')
const app = express();

const productosRouter = require('./routes/productsRoutes');
const carritoRouter = require('./routes/carritoRoutes');
const defRoute = require('./routes/default')
const path = require('path')
var port = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded())
//app.use(express.static(path.join(__dirname, 'public')))


app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);
//routes not found
app.use('/*', defRoute)







app.listen(port, () => {
    console.log(`Escuchando en el puerto 8080`);
});