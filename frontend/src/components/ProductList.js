import React from 'react';

function ProductList({ products, onAddToCart }) {
  return (
    <div className="row g-4">
      {products.map((product) => (
        <div key={product._id} className="col-md-6 col-lg-4">
          <div className="card">
            <img 
              src={product.image} 
              className="card-img-top" 
              alt={product.name}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text text-muted">{product.description}</p>
              <div className="d-flex justify-content-between align-items-center">
                <span className="h5 mb-0 text-primary">${product.price.toFixed(2)}</span>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => onAddToCart(product._id)}
                >
                  <i className="bi bi-cart-plus"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
