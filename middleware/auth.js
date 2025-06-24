// middleware/auth.js
module.exports = (req, res, next) => {
    const apiKey = req.headers['x-api-key']
    if (apiKey !== 'mysecurekey') {
      return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' })
    }
    next()
  }
// This middleware checks for a custom API key in the request headers  