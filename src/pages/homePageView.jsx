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

export default function HomePageView() {
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
    <div className="w-full min-h-screen bg-primary text-secondary font-sans flex flex-col">
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

        {/* Hero Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-secondary/10 to-secondary/70 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-0">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary drop-shadow-xl max-w-3xl leading-tight">
            Crystal Beauty Clear
          </h1>
          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-primary drop-shadow-lg max-w-2xl">
            Reveal Your Natural Glow with Premium Skincare & Beauty Essentials
          </p>
          <a
            href="/products"
            className="mt-8 px-8 py-4 sm:px-10 sm:py-4 bg-accent text-primary font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:bg-accent/90 transition-all duration-300"
          >
            Explore Now
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-primary flex flex-col items-center px-4 sm:px-6 lg:px-0">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-secondary text-center">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 justify-items-center">
          {[
            {
              icon: <FaLeaf className="text-accent w-14 h-14 mb-4" />,
              title: "Natural Ingredients",
              desc: "Pure, gentle skincare that enhances your beauty naturally.",
            },
            {
              icon: <FaShippingFast className="text-accent w-14 h-14 mb-4" />,
              title: "Fast Delivery",
              desc: "Quick and safe delivery right to your door.",
            },
            {
              icon: <FaGift className="text-accent w-14 h-14 mb-4" />,
              title: "Special Offers",
              desc: "Exclusive discounts for our loyal customers.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-2xl shadow-2xl transition-transform w-72 text-center flex flex-col items-center"
            >
              {feature.icon}
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 bg-accent/10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Explore Categories
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Discover collections designed to match your lifestyle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            {
              title: "Electronics",
              desc: "Smart technology for modern living.",
              image: "/electronics.jpg",
            },
            {
              title: "Fashion",
              desc: "Timeless style crafted for confidence.",
              image: "/fashion.jpg",
            },
            {
              title: "Beauty",
              desc: "Nourish your glow with premium care.",
              image: "/beauty.jpg",
            },
          ].map((cat, i) => (
            <motion.a
              href="/products"
              key={i}
              whileHover={{ scale: 1.03 }}
              className="relative h-[380px] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-secondary/60 flex flex-col justify-center items-center text-center px-6">
                <h3 className="text-3xl font-bold text-primary mb-3">
                  {cat.title}
                </h3>
                <p className="text-primary/90">{cat.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-primary flex flex-col items-center px-4 sm:px-6 lg:px-0">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-secondary text-center">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              name: "Sophia L.",
              review:
                "Amazing products! My skin feels refreshed and natural. Highly recommend!",
            },
            {
              name: "Emma R.",
              review:
                "Fast delivery and excellent customer service. Love Crystal Beauty Clear!",
            },
            {
              name: "Olivia M.",
              review:
                "The natural ingredients really make a difference. My skin glows now.",
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-accent/10 p-8 rounded-2xl shadow-xl text-center"
            >
              <p className="text-muted mb-4">"{testimonial.review}"</p>
              <h4 className="font-semibold text-secondary">{testimonial.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-primary py-16 px-6 ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center md:text-left gap-12">
          {/* About */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">Crystal Beauty Clear</h3>
            <p className="text-white/70 max-w-xs">
              Premium skincare products designed to enhance your natural beauty.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h4 className="font-semibold mb-4">Quick Links</h4>
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
                <a href="/about" className="hover:text-accent transition">
                  About
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
            <h4 className="font-semibold mb-4">Follow Us</h4>
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

        <p className="text-center text-white/60 mt-10 text-sm">
          &copy; {new Date().getFullYear()} Crystal Beauty Clear. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
