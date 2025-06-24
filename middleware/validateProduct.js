// middleware/validateProduct.js

// This middleware checks if all product fields are provided correctly before saving/updating
module.exports = (req, res, next) => {
    const { name, description, price, category, inStock } = req.body
  
    // Check if any field is missing or null
    if (!name || !description || price == null || !category || inStock == null) {
      return res.status(400).json({ error: 'All product fields are required' })
    }
  
    // If everything is okay, move to the next middleware or route handler
    next()
  }
  