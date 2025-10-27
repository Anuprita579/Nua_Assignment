import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../assets/nua-logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const count = cartItems.length;

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      {/* Logo */}
      <Link to="/" data-testid="logo-test">
        <img src={Logo} alt="logo" className="h-10" />
      </Link>

      <Link to="/cart" className="relative text-gray-700">
        <ShoppingCartIcon fontSize="large" />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
            {count}
          </span>
        )}
      </Link>
    </header>
  );
};

export default Header;
