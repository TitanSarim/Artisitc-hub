import React, { useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item._id !== itemId));
  };

  const handleCheckout = () => {
    setIsCheckout(true);
    // Will integrate with Stripe later
  };

  return (
    <div className="cart-container">
      <h1 className="page-title">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="continue-shopping">Continue Shopping</button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-image">
                  <img
                    src={
                      item.imageUrl ||
                      "/images/albert-dera-ILip77SbmOE-unsplash.jpg"
                    }
                    alt={item.title}
                  />
                </div>
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <p className="artist">
                    By {item.artist?.username || "Unknown"}
                  </p>
                  <p className="price">${item.price || 0}</p>
                </div>
                <button
                  className="remove-item"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-details">
              <p>Subtotal: ${calculateTotal()}</p>
              <p>Shipping: $0.00</p>
              <p className="total">Total: ${calculateTotal()}</p>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        .cart-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .page-title {
          font-size: 2.5rem;
          color: #333;
          text-align: center;
          margin-bottom: 2rem;
        }

        .empty-cart {
          text-align: center;
          padding: 2rem;
        }

        .empty-cart p {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 1rem;
        }

        .continue-shopping {
          padding: 0.75rem 1.5rem;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .item-image {
          width: 100px;
          height: 100px;
          border-radius: 4px;
          overflow: hidden;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-details {
          flex: 1;
        }

        .item-details h3 {
          margin: 0;
          color: #333;
        }

        .artist {
          color: #666;
          font-size: 0.9rem;
        }

        .price {
          color: #333;
          font-weight: 600;
        }

        .remove-item {
          padding: 0.5rem 1rem;
          background: #fee2e2;
          color: #dc2626;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .cart-summary {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .summary-details {
          margin-bottom: 1.5rem;
        }

        .summary-details p {
          margin: 0.5rem 0;
          color: #666;
        }

        .total {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #eee;
        }

        .checkout-button {
          width: 100%;
          padding: 1rem;
          background: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .checkout-button:hover {
          background: #4338ca;
        }

        @media (max-width: 768px) {
          .cart-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .item-image {
            width: 100%;
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;
