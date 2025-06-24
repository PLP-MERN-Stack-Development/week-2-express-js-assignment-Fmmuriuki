// server.js - Week 2 Express Assignment – Complete with Task 5

// Middleware & utilities
const errorHandler = require('./middleware/errorHandler')
const { NotFoundError } = require('./utils/errors')
const logger = require('./middleware/logger')
const auth = require('./middleware/auth')
const validateProduct = require('./middleware/validateProduct')

// Express and other packages
const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')

// Initialize app
const app = express()
const PORT = process.env.PORT || 3000

// Middleware setup
app.use(bodyParser.json())
app.use(logger)   // Logs request method, URL, and time
app.use(auth)     // Checks for API key

// In-memory product data
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
]

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.')
})

// ✅ GET /api/products – Filter + Pagination
app.get('/api/products', (req, res) => {
  const { category, page = 1, limit = 5 } = req.query
  let result = products

  // Filter by category if given
  if (category) {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase())
  }

  // Pagination
  const start = (page - 1) * limit
  const end = start + parseInt(limit)
  const paginated = result.slice(start, end)

  res.json(paginated)
})

// ✅ GET /api/products/search?q=name – Search by product name
app.get('/api/products/search', (req, res) => {
  const { q } = req.query
  if (!q) return res.status(400).json({ error: 'Search query is required' })

  const results = products.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase())
  )
  res.json(results)
})

// ✅ GET /api/products/stats/category – Count by category
app.get('/api/products/stats/category', (req, res) => {
  const stats = {}
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1
  })
  res.json(stats)
})

// ✅ GET a specific product
app.get('/api/products/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id)
  if (!product) return next(new NotFoundError('Product not found'))
  res.json(product)
})

// ✅ POST a new product (with validation)
app.post('/api/products', validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  }
  products.push(newProduct)
  res.status(201).json(newProduct)
})

// ✅ PUT (update) a product
app.put('/api/products/:id', validateProduct, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id)
  if (index === -1) return next(new NotFoundError('Product not found'))

  const { name, description, price, category, inStock } = req.body
  products[index] = {
    ...products[index],
    name,
    description,
    price,
    category,
    inStock
  }
  res.json(products[index])
})

// ✅ DELETE a product
app.delete('/api/products/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id)
  if (index === -1) return next(new NotFoundError('Product not found'))

  const deleted = products.splice(index, 1)
  res.json(deleted[0])
})

// ✅ Global error handler (always last)
app.use(errorHandler)

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

module.exports = app
