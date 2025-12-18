import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching products');
      setLoading(false);
      console.error('Error fetching products:', err);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get('/api/cart');
      setCartItems(response.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const addToCart = async (productId) => {
    try {
      await axios.post('/api/cart', { productId });
      fetchCart();
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Error adding item to cart');
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(`/api/cart/${itemId}`, { quantity });
      fetchCart();
    } catch (err) {
      console.error('Error updating quantity:', err);
      alert('Error updating quantity');
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`/api/cart/${itemId}`);
      fetchCart();
    } catch (err) {
      console.error('Error removing from cart:', err);
      alert('Error removing item from cart');
    }
  };

  const checkout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    try {
      const response = await axios.post('/api/checkout');
      alert(`${response.data.message}\nTotal: $${response.data.total}\nItems: ${response.data.itemCount}`);
      fetchCart();
    } catch (err) {
      console.error('Error during checkout:', err);
      alert('Error processing checkout');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            <i className="bi bi-cart"></i> MERN Shopping Cart
          </span>
          <span className="navbar-text text-white">
            Cart Items: {cartItems.length} | Total: ${calculateTotal()}
          </span>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <h2 className="mb-4">Products</h2>
            <ProductList products={products} onAddToCart={addToCart} />
          </div>
          <div className="col-md-4">
            <h2 className="mb-4">Shopping Cart</h2>
            <Cart
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              onCheckout={checkout}
              total={calculateTotal()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
