import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <Link
    to={`/product/${product.id}`}
    className="border-2 border-gray-200 p-4 rounded shadow-lg hover:shadow-xl"
  >
    <img src={product.image} alt={product.title} className="h-40 mx-auto" />
    <h3 className="text-sm font-semibold mt-2">{product.title}</h3>
    <p className="font-bold text-gray-700">₹{product.price}</p>
  </Link>
);

export default ProductCard;
