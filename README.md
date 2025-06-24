# 📦 Product API – Express.js Week 2 Project

This is a beginner-friendly RESTful API built with **Express.js**. It manages a list of products with full **CRUD operations**, **middleware**, **error handling**, and **advanced features** like search, filtering, and statistics.

---

## 🚀 How to Run the Project

### 📁 1. Clone the repository

```bash
git clone https://github.com/your-username/product-api.git
cd product-api

📦 2. Install dependencies
bash
Copy
Edit
npm install
🔐 3. Create a .env file
Copy the provided .env.example and rename it to .env, then edit it like so:

env
Copy
Edit
API_KEY=123456
PORT=3000
▶️ 4. Start the server
bash
Copy
Edit
node server.js
Or use nodemon if installed:

bash
Copy
Edit
npx nodemon server.js
📡 API Endpoints
All endpoints are under /api/products.

✅ Headers must include:

makefile
Copy
Edit
x-api-key: 123456
Method	Endpoint	Description
GET	/api/products	Get all products (with filter, pagination)
GET	/api/products/:id	Get a product by ID
POST	/api/products	Create a new product
PUT	/api/products/:id	Update an existing product
DELETE	/api/products/:id	Delete a product
GET	/api/products/search?q=term	Search products by name
GET	/api/products/stats/category	Product count by category

🧪 Sample Requests
📥 POST /api/products
json
Copy
Edit
{
  "name": "Toaster",
  "description": "2-slice toaster with defrost option",
  "price": 45.99,
  "category": "kitchen",
  "inStock": true
}
Headers:

makefile
Copy
Edit
x-api-key: 123456
Content-Type: application/json
🛡️ Middleware
✅ logger: Logs every request (method, URL, timestamp)

✅ auth: Verifies API key in headers

✅ validateProduct: Checks for required fields in POST/PUT

✅ errorHandler: Handles all server errors with status codes

📊 Advanced Features
🔍 Search by name: /api/products/search?q=laptop

🗂 Filter by category: /api/products?category=kitchen

📑 Pagination: /api/products?page=2&limit=5

📈 Stats: /api/products/stats/category (returns product counts per category)

📁 Folder Structure
bash
Copy
Edit
.
├── server.js
├── .env.example
├── README.md
├── /middleware
│   ├── auth.js
│   ├── logger.js
│   └── validateProduct.js
├── /utils
│   └── errors.js
🧠 Author
Felix M. Muriuki
PLP Full Stack Web Development Student
Follow me on TikTok – @felixcodes

📌 Notes
This API uses in-memory storage (no database yet).

Perfect for learning CRUD + middleware in Node/Express.

Built as part of Week 2 MERN Stack training.

