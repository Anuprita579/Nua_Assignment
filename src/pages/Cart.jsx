import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementItem,
  decrementItem,
  removeItem,
  addItem,
} from "../stores/cartSlice";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import useLocalStorage from "../hooks/useLocalStorage";

function Cart() {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [storedCart, setStoredCart] = useLocalStorage("cart", []);

  useEffect(() => {
    if (storedCart && storedCart.length > 0 && cartItems.length === 0) {
      storedCart.forEach((item) => dispatch(addItem(item)));
    }
  }, [storedCart]);

  useEffect(() => {
    if (cartItems.length > 0) {
      setStoredCart(cartItems);
    } else {
      setStoredCart([]);
    }
  }, [cartItems]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b py-3 gap-4 sm:gap-0"
            >
              {/* Left side */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 sm:w-16 sm:h-16 object-contain"
                />
                <div>
                  <h3 className="font-medium text-sm sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    ₹{item.price}
                  </p>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <RemoveIcon
                    data-testid="decrement-btn"
                    onClick={() => dispatch(decrementItem({ id: item.id }))}
                    className="px-1 py-1 bg-pink-600 rounded text-white hover:bg-pink-700 cursor-pointer"
                  />
                  <span className="text-sm sm:text-base">{item.quantity}</span>
                  <AddIcon
                    data-testid="increment-btn"
                    onClick={() => dispatch(incrementItem({ id: item.id }))}
                    className="px-1 py-1 bg-pink-600 rounded text-white hover:bg-pink-700 cursor-pointer"
                  />
                </div>

                <p className="font-medium text-right text-sm sm:text-base w-full sm:w-24">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>

                <ClearIcon
                  onClick={() => dispatch(removeItem({ id: item.id }))}
                  className="text-red-600 text-lg hover:text-red-700 cursor-pointer"
                />
              </div>
            </div>
          ))}

          {/* Total and Checkout */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 sm:gap-0">
            <h3 className="text-lg sm:text-xl font-semibold text-center sm:text-left">
              Total: ₹{total.toFixed(2)}
            </h3>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
