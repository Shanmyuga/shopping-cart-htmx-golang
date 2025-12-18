const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { Product, CartItem } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all API routes
app.use('/api/', limiter);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-cart';

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
  initializeProducts();
})
.catch((err) => console.error('MongoDB connection error:', err));

// Initialize products if database is empty
async function initializeProducts() {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const sampleProducts = [
        {
          name: 'Wireless Headphones',
          price: 79.99,
          image: 'https://via.placeholder.com/200x200?text=Headphones',
          description: 'High-quality wireless headphones with noise cancellation'
        },
        {
          name: 'Smart Watch',
          price: 199.99,
          image: 'https://via.placeholder.com/200x200?text=Smart+Watch',
          description: 'Feature-rich smartwatch with fitness tracking'
        },
        {
          name: 'Laptop Stand',
          price: 49.99,
          image: 'https://via.placeholder.com/200x200?text=Laptop+Stand',
          description: 'Ergonomic laptop stand for better posture'
        },
        {
          name: 'USB-C Hub',
          price: 39.99,
          image: 'https://via.placeholder.com/200x200?text=USB-C+Hub',
          description: 'Multi-port USB-C hub with HDMI and card reader'
        },
        {
          name: 'Wireless Mouse',
          price: 29.99,
          image: 'https://via.placeholder.com/200x200?text=Wireless+Mouse',
          description: 'Ergonomic wireless mouse with precision tracking'
        },
        {
          name: 'Mechanical Keyboard',
          price: 129.99,
          image: 'https://via.placeholder.com/200x200?text=Keyboard',
          description: 'RGB mechanical keyboard with tactile switches'
        }
      ];
      
      await Product.insertMany(sampleProducts);
      console.log('Sample products initialized');
    }
  } catch (error) {
    console.error('Error initializing products:', error);
  }
}

// API Routes

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Get cart items
app.get('/api/cart', async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart items', error: error.message });
  }
});

// Add item to cart
app.post('/api/cart', async (req, res) => {
  try {
    const { productId } = req.body;
    
    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check if item already exists in cart
    const existingItem = await CartItem.findOne({ productId });
    
    if (existingItem) {
      // Increment quantity
      existingItem.quantity += 1;
      await existingItem.save();
      res.json(existingItem);
    } else {
      // Create new cart item
      const newCartItem = new CartItem({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
      await newCartItem.save();
      res.status(201).json(newCartItem);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
});

// Update cart item quantity
app.put('/api/cart/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }
    
    const cartItem = await CartItem.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item', error: error.message });
  }
});

// Remove item from cart
app.delete('/api/cart/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await CartItem.findByIdAndDelete(id);
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing cart item', error: error.message });
  }
});

// Checkout (clear cart)
app.post('/api/checkout', async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    // Calculate total in cents to avoid floating point precision issues
    const totalCents = cartItems.reduce((sum, item) => sum + Math.round(item.price * 100) * item.quantity, 0);
    const total = (totalCents / 100).toFixed(2);
    
    // Clear the cart
    await CartItem.deleteMany({});
    
    res.json({ 
      message: 'Order placed successfully!', 
      total: total,
      itemCount: cartItems.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing checkout', error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
