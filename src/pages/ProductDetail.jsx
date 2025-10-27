import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  incrementItem,
  decrementItem,
  removeItem,
} from "../stores/cartSlice";
import { API_BASE } from "../constants/api";
import Loader from "../components/Loader";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === Number(id))
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`${API_BASE}/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity: 1 }));
  };

  const increment = () => {
    dispatch(incrementItem({ id: product.id }));
  };

  const decrement = () => {
    if (quantity === 1) {
      dispatch(removeItem({ id: product.id }));
    } else {
      dispatch(decrementItem({ id: product.id }));
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-contain"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-3">{product.description}</p>
          <p className="text-lg font-bold mb-3">₹{product.price}</p>

          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-3 text-black">
              <RemoveIcon
                onClick={decrement}
                className="px-1 py-1 bg-pink-600 rounded hover:bg-pink-700 text-white"
              />
              <span>{quantity}</span>
              <AddIcon
                onClick={increment}
                disabled={quantity >= 5}
                className="px-1 py-1 bg-pink-600 rounded hover:bg-pink-700 text-white"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
