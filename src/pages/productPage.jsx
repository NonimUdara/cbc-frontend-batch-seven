import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Loader } from "../components/loader";
import ProductCard from "../components/productCard";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

export default function ProductPageView() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Normalize helper
  const normalize = (value = "") =>
    value.toString().trim().toLowerCase();

  // Fetch all products ONCE
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load products");
        setIsLoading(false);
      });
  }, []);

  // 🔥 SMART SEARCH (FIXED)
  const handleSearch = (value) => {
    const keyword = normalize(value);

    if (!keyword) {
      setFiltered(products);
      return;
    }

    const result = products.filter((product) => {
      return (
        normalize(product.name).includes(keyword) ||
        normalize(product.category).includes(keyword) ||
        normalize(product.description).includes(keyword)
      );
    });

    setFiltered(result);
  };

  // Category grouping (SAFE)
  const electronics = filtered.filter(
    (p) => normalize(p.category) === "electronics"
  );

  const fashion = filtered.filter(
    (p) => normalize(p.category) === "fashion"
  );

  const beauty = filtered.filter(
    (p) => normalize(p.category) === "beauty"
  );

  return (
    <div className="w-full min-h-screen bg-primary text-secondary font-sans flex flex-col">

      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 to-secondary/80" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-primary drop-shadow-xl">
            Our Products
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-primary/90">
            Explore electronics, fashion & beauty collections.
          </p>

          <input
            type="text"
            placeholder="Search products or categories..."
            onChange={(e) => handleSearch(e.target.value)}
            className="mt-8 w-[90%] sm:w-[400px] h-[50px] rounded-xl border border-white/30 text-center bg-white/90 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </motion.div>
      </section>

      {isLoading && <Loader />}

      {/* No Results */}
      {!isLoading && filtered.length === 0 && (
        <div className="py-24 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            No products found
          </h2>
          <p className="text-muted">
            Try searching by product name or category.
          </p>
        </div>
      )}

      {/* Products */}
      {!isLoading && filtered.length > 0 && (
        <div className="py-20 space-y-28">

          {beauty.length > 0 && (
            <CategorySection
              title="Beauty"
              desc="Nourish your glow with premium care."
              products={beauty}
            />
          )}

          {fashion.length > 0 && (
            <CategorySection
              title="Fashion"
              desc="Timeless styles crafted for confidence."
              products={fashion}
            />
          )}

          {electronics.length > 0 && (
            <CategorySection
              title="Electronics"
              desc="Innovative technology for modern living."
              products={electronics}
            />
          )}

        </div>
      )}

      {/* Footer */}
      <footer className="bg-secondary text-primary py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">
              Crystal Beauty Clear
            </h3>
            <p className="text-white/70 max-w-xs">
              Premium skincare products designed to enhance your natural beauty.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-accent">Home</a></li>
              <li><a href="/products" className="hover:text-accent">Products</a></li>
              <li><a href="/about" className="hover:text-accent">About</a></li>
              <li><a href="/contact" className="hover:text-accent">Contact</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 text-xl">
              <FaInstagram className="hover:text-accent cursor-pointer" />
              <FaFacebookF className="hover:text-accent cursor-pointer" />
              <FaTwitter className="hover:text-accent cursor-pointer" />
            </div>
          </div>
        </div>

        <p className="text-center text-white/60 mt-10 text-sm">
          &copy; {new Date().getFullYear()} Crystal Beauty Clear. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

/* ---------------- Helper Components ---------------- */

function CategorySection({ title, desc, products }) {
  return (
    <section className="max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-muted max-w-2xl mx-auto text-lg">
          {desc}
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-10">
        {products.map((item) => (
          <motion.div
            key={item.productID}
            whileHover={{ scale: 1.05 }}
          >
            <ProductCard product={item} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
