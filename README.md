# Shopping Cart - MERN Stack

A fully functional shopping cart application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- **Product Listing**: Display products with name, price, and image
- **Add to Cart**: Add items to a persistent shopping cart
- **View Cart**: View all cart items with quantity and subtotal
- **Update/Remove Items**: Adjust quantities or remove items from cart
- **Total Calculation**: Automatic calculation of total cost
- **Checkout**: Simulated checkout that clears the cart

## Project Structure

```
.
├── frontend/              # React frontend application
│   ├── public/           # Static files
│   ├── src/              # React source files
│   │   ├── components/   # React components
│   │   │   ├── ProductList.js  # Product listing component
│   │   │   └── Cart.js         # Shopping cart component
│   │   ├── App.js        # Main application component
│   │   ├── App.css       # Application styles
│   │   ├── index.js      # Entry point
│   │   └── index.css     # Global styles
│   └── package.json      # Frontend dependencies
├── backend/              # Node.js/Express backend
│   ├── server.js         # Express server and API routes
│   ├── models.js         # MongoDB schemas (Product, CartItem)
│   └── package.json      # Backend dependencies
├── .gitignore           # Git ignore file
└── README.md            # Project documentation
```

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js) or **yarn**

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd shopping-cart-htmx-golang
```

### 2. Set Up MongoDB

Make sure MongoDB is running on your local machine:

```bash
# Start MongoDB (if installed locally)
mongod

# Or use MongoDB service
sudo systemctl start mongodb
```

The application will connect to `mongodb://localhost:27017/shopping-cart` by default.

### 3. Set Up Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the backend server
npm start

# Or use nodemon for development (auto-restart on changes)
npm run dev
```

The backend server will start on `http://localhost:5000`.

### 4. Set Up Frontend

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/products` - Get all products
- `GET /api/cart` - Get all cart items
- `POST /api/cart` - Add item to cart (body: `{ productId }`)
- `PUT /api/cart/:id` - Update cart item quantity (body: `{ quantity }`)
- `DELETE /api/cart/:id` - Remove item from cart
- `POST /api/checkout` - Process checkout and clear cart
- `GET /api/health` - Health check endpoint

## Usage

1. **Browse Products**: View the list of available products on the left side
2. **Add to Cart**: Click "Add to Cart" button on any product
3. **View Cart**: See your cart items on the right side
4. **Update Quantity**: Use +/- buttons to adjust item quantities
5. **Remove Items**: Click the trash icon to remove an item
6. **Checkout**: Click the "Checkout" button to complete your order

## Technologies Used

- **Frontend**:
  - React 18
  - Axios (HTTP client)
  - Bootstrap 5 (UI framework)
  - Bootstrap Icons

- **Backend**:
  - Node.js
  - Express.js
  - Mongoose (MongoDB ODM)
  - CORS (Cross-Origin Resource Sharing)

- **Database**:
  - MongoDB

## Configuration

### Environment Variables

You can customize the application using environment variables:

**Backend** (create a `.env` file in the `backend` directory):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopping-cart
```

**Frontend** (already configured with proxy in `package.json`):
The React app proxies API requests to `http://localhost:5000`.

## Development Notes

- The backend automatically initializes sample products when the database is empty
- The frontend uses React hooks for state management
- CORS is enabled for cross-origin requests
- The cart data persists in MongoDB

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running: `mongod` or `sudo systemctl status mongodb`
- Check the connection URI in `backend/server.js`

**Port Already in Use:**
- Backend: Change `PORT` in `.env` or `server.js`
- Frontend: It will prompt you to use a different port

**Module Not Found:**
- Make sure you ran `npm install` in both `frontend` and `backend` directories

## Future Enhancements

- User authentication and authorization
- Product search and filtering
- Payment gateway integration
- Order history
- Product reviews and ratings
- Admin panel for product management

---

**"Start simple. Dream big."**