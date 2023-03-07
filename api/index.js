const express = require('express')
var morgan = require('morgan')
const bodyParser = require('body-parser')
const db = require('./queries')
var cors = require('cors')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors())
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })



//
app.get('/products', morgan("combined"), db.getProducts)
app.get('/products/:id', db.getProductsById)
app.post('/products', db.createProducts)
app.put('/products/:id', morgan("combined"), db.updateProducts)
app.delete('/products/:id', db.deleteProducts)
//
app.get('/orders', db.getOrders)
app.get('/orders/:id', db.getOrdersById)
app.post('/orders', db.createOrder)
app.patch('/content/:id', db.updateOrders)
app.delete('/orders/:id', db.deleteOrders)
//
app.get('/content/:id', db.getContentsById)
//
app.post('/login' , db.login);
app.post('/register' , db.register);
app.get('/users' , db.getLocation)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})