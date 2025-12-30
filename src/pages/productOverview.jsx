import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { addToCart, loadCart } from "../utils/cart";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

export default function ProductOverview() {
  const { id } = useParams();
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products/" + id)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch(() => {
        toast.error("Error fetching product");
        setStatus("error");
      });
  }, [id]);

  return (
    <div className="w-full min-h-screen bg-primary text-secondary">

      {/* Loader */}
      {status === "loading" && <Loader />}

      {/* Error */}
      {status === "error" && (
        <div className="h-[60vh] flex items-center justify-center">
          <h1 className="text-red-500 text-xl">Failed to load product</h1>
        </div>
      )}

      {/* Product */}
      {status === "success" && product && (
        <>
          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* Images */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center"
              >
                <ImageSlider images={product.images} />
              </motion.div>

              {/* Details */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-6 lg:sticky lg:top-28"
              >
                {/* Product ID */}
                <span className="text-sm text-secondary/60">
                  Product ID: {product.productID}
                </span>

                {/* Name */}
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                  {product.name}
                  {product.altNames?.map((name, i) => (
                    <span
                      key={i}
                      className="block text-sm font-normal text-secondary/60 mt-1"
                    >
                      {name}
                    </span>
                  ))}
                </h1>

                {/* Category */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Category:</span>
                  <span className="px-4 py-1 rounded-full border border-secondary text-sm capitalize">
                    {product.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-secondary/80 leading-relaxed text-justify">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-4 mt-4">
                  {product.labledPrice > product.price && (
                    <span className="text-lg text-secondary/50 line-through">
                      LKR {product.labledPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-2xl font-semibold text-accent">
                    LKR {product.price.toFixed(2)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      toast.success("Product added to cart");
                    }}
                    className="flex-1 h-12 border border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-all"
                  >
                    Add to Cart
                  </button>

                  <Link
                    to="/checkout"
                    state={[
                      {
                        productID: product.productID,
                        image: product.images[0],
                        name: product.name,
                        price: product.price,
                        labledPrice: product.labledPrice,
                        quantity: 1,
                      },
                    ]}
                    className="flex-1 h-12 rounded-lg bg-accent text-white flex items-center justify-center hover:bg-white hover:text-accent border border-accent transition-all"
                    onClick={() => console.log(loadCart())}
                  >
                    Buy Now
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Footer (SAME AS PRODUCTS PAGE) */}
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
                  <li><Link to="/" className="hover:text-accent">Home</Link></li>
                  <li><Link to="/products" className="hover:text-accent">Products</Link></li>
                  <li><Link to="/about" className="hover:text-accent">About</Link></li>
                  <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
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
        </>
      )}
    </div>
  );
}
