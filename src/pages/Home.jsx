import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import useDebounce from "../hooks/useDebounce";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState(() => {
    const stored = localStorage.getItem("productCache");
    return stored ? JSON.parse(stored) : {};
  });

  const debouncedSearch = useDebounce(search, 400);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/products/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch and cache products
  useEffect(() => {
    let isMounted = true; // prevent setState on unmounted component

    const fetchProducts = async () => {
      try {
        if (products.length === 0) setLoading(true);
        const cacheKey = `${selectedCategory}-${debouncedSearch}`;

        if (cache[cacheKey]) {
          if (isMounted) setProducts(cache[cacheKey]);
          return;
        }

        const res = await axiosInstance.get("/products");
        const allProducts = res.data;

        const filtered = allProducts.filter(
          (p) =>
            p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
            (selectedCategory ? p.category === selectedCategory : true)
        );

        if (isMounted) {
          setProducts(filtered);
          const newCache = { ...cache, [cacheKey]: filtered };
          setCache(newCache);
          localStorage.setItem("productCache", JSON.stringify(newCache));
        }
      } catch (err) {
        if (isMounted) setError("Failed to fetch products");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [debouncedSearch, selectedCategory]);

  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div>
      <div className="flex justify-between mb-4 items-center">
        {/* Search */}
        <div className="border-2 border-gray-300 p-2 rounded w-1/2 flex items-center gap-4">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full focus:outline-none"
          />
        </div>

        {/* Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {loading && <Loader />}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {!loading && products.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
