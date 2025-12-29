import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../components/loader";
import ProductCard from "../components/productCard";
import { FaShippingFast, FaLeaf, FaGift } from "react-icons/fa";

export default function HomePageView() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((res) => {
        setProducts(res.data.slice(0, 4)); // Show 4 featured products
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load products");
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-full min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex flex-col justify-center items-center text-center px-5 bg-accent text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-5">
          Crystal Beauty Clear
        </h1>
        <p className="text-lg md:text-2xl text-primary mb-8">
          Discover Radiance, Embrace Confidence
        </p>
        <a
          href="/products"
          className="px-8 py-3 bg-primary text-accent font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Shop Now
        </a>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 flex flex-col items-center bg-primary px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12">
          Why Choose Us
        </h2>
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 justify-center items-center">
          <div className="flex flex-col items-center text-center p-5 bg-white rounded-xl shadow-lg w-64">
            <FaLeaf className="text-accent w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-secondary mb-2">
              Natural Ingredients
            </h3>
            <p className="text-muted">
              Only the purest ingredients for glowing, healthy skin.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-5 bg-white rounded-xl shadow-lg w-64">
            <FaShippingFast className="text-accent w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-secondary mb-2">
              Fast Delivery
            </h3>
            <p className="text-muted">
              Quick and safe delivery to your doorstep.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-5 bg-white rounded-xl shadow-lg w-64">
            <FaGift className="text-accent w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-secondary mb-2">
              Special Offers
            </h3>
            <p className="text-muted">
              Exclusive deals and discounts for our valued customers.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full py-16 bg-primary px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
          Featured Products
        </h2>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {products.map((product) => (
              <ProductCard product={product} key={product.productID} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-accent text-white flex flex-col items-center px-5">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start Your Beauty Journey Today
        </h2>
        <p className="text-lg md:text-xl mb-8 text-primary">
          Explore our exclusive skincare range and experience the magic of Crystal Beauty Clear.
        </p>
        <a
          href="/products"
          className="px-8 py-3 bg-primary text-accent font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Shop Now
        </a>
      </section>
    </div>
  );
}
