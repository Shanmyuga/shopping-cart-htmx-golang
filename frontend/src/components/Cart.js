import React from 'react';

function Cart({ cartItems, onUpdateQuantity, onRemove, onCheckout, total }) {
  if (cartItems.length === 0) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="empty-cart">
            <i className="bi bi-cart-x"></i>
            <p>Your cart is empty</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="row align-items-center">
                <div className="col-3">
                  <img src={item.image} alt={item.name} className="img-fluid" />
                </div>
                <div className="col-9">
                  <h6 className="mb-1">{item.name}</h6>
                  <p className="text-muted mb-2">${item.price.toFixed(2)}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="quantity-controls">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="fw-bold">{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onRemove(item._id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                  <div className="mt-2">
                    <small className="text-muted">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-total">
          <div className="d-flex justify-content-between mb-3">
            <strong>Total:</strong>
            <strong className="text-primary">${total}</strong>
          </div>
          <button 
            className="btn btn-success w-100"
            onClick={onCheckout}
          >
            <i className="bi bi-credit-card"></i> Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
