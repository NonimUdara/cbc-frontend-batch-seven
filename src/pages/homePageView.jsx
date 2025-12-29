import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "../components/loader";
import ProductCard from "../components/productCard";
import {
  FaShippingFast,
  FaLeaf,
  FaGift,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

const sliderImages = [
  "/Home1.jpg",
  "/Home2.jpg",
  "/Home3.jpg",
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch products
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((res) => {
        setProducts(res.data.slice(0, 4));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load products");
        setIsLoading(false);
      });
  }, []);

  // Slider interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-primary text-secondary font-sans flex flex-col justify-center">
      {/* Hero Slider */}
      <section className="relative w-full h-screen overflow-hidden flex justify-center items-center">
        <AnimatePresence>
          <motion.img
            key={currentSlide}
            src={sliderImages[currentSlide]}
            alt="slider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-secondary/30 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary drop-shadow-lg max-w-3xl">
            Crystal Beauty Clear
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-2xl text-primary drop-shadow-md max-w-xl">
            Reveal Your Natural Glow
          </p>
          <a
            href="/products"
            className="mt-6 px-6 py-3 sm:px-8 sm:py-3 bg-accent text-primary font-semibold rounded-lg shadow-lg hover:bg-accent/90 transition"
          >
            Explore Now
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-primary flex flex-col items-center px-4 sm:px-6 lg:px-0">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-secondary text-center">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-30 justify-items-center">
          {[
            {
              icon: <FaLeaf className="text-accent w-12 h-12 mb-3" />,
              title: "Natural Ingredients",
              desc: "Pure, gentle skincare that enhances your beauty naturally.",
            },
            {
              icon: <FaShippingFast className="text-accent w-12 h-12 mb-3" />,
              title: "Fast Delivery",
              desc: "Quick and safe delivery right to your door.",
            },
            {
              icon: <FaGift className="text-accent w-12 h-12 mb-3" />,
              title: "Special Offers",
              desc: "Exclusive discounts for our loyal customers.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-xl hover:scale-105 transition transform w-64 text-center flex flex-col items-center"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-primary px-4 sm:px-6 lg:px-0">
        <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-12 text-center">
          Featured Products
        </h2>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            {products.map((product) => (
              <ProductCard product={product} key={product.productID} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-primary py-12 px-6 ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center md:text-center gap-8">
          {/* About */}
          <div className="flex flex-col items-center ">
            <h3 className="text-xl font-bold mb-4">Crystal Beauty Clear</h3>
            <p className="text-white/70 max-w-xs">
              Premium skincare products designed to enhance your natural beauty.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center ">
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-accent transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-accent transition">
                  Products
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-accent transition">
                  Features
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-accent transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold mb-3">Follow Us</h4>
            <div className="flex gap-4 text-xl justify-center md:justify-start">
              <a href="#" className="hover:text-accent transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-accent transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-accent transition">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-white/60 mt-8 text-sm">
          &copy; {new Date().getFullYear()} Crystal Beauty Clear. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
