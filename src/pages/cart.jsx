import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { addToCart, getTotal, loadCart } from "../utils/cart";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

export default function CartPage() {
  const [cart, setCart] = useState(loadCart());

  return (
    <div className="w-full min-h-screen bg-primary text-secondary flex flex-col">

      {/* CONTENT */}
      <div className="flex-1 flex justify-center px-4 py-16">
        <div className="w-full max-w-4xl">

          {/* EMPTY CART */}
          {cart.length === 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <h1 className="text-3xl font-bold mb-4">
                Your cart is empty 🛒
              </h1>
              <p className="text-secondary/70 mb-8">
                Looks like you haven’t added anything yet.
              </p>
              <Link
                to="/products"
                className="inline-block px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition"
              >
                Continue Shopping
              </Link>
            </div>
          )}

          {/* CART ITEMS */}
          {cart.length > 0 && (
            <div className="flex flex-col gap-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row items-center gap-6 relative"
                >
                  {/* REMOVE */}
                  <button
                    className="absolute top-4 right-4 text-red-500 text-xl hover:scale-110 transition"
                    onClick={() => {
                      addToCart(item, -item.quantity);
                      setCart(loadCart());
                    }}
                  >
                    <BiTrash />
                  </button>

                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-xl"
                  />

                  {/* INFO */}
                  <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-sm text-secondary/60">
                      {item.productID}
                    </p>
                  </div>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3">
                    <CiCircleChevUp
                      className="text-3xl cursor-pointer hover:text-accent"
                      onClick={() => {
                        addToCart(item, 1);
                        setCart(loadCart());
                      }}
                    />
                    <span className="text-xl font-semibold">
                      {item.quantity}
                    </span>
                    <CiCircleChevDown
                      className="text-3xl cursor-pointer hover:text-accent"
                      onClick={() => {
                        if (item.quantity > 1) {
                          addToCart(item, -1);
                          setCart(loadCart());
                        }
                      }}
                    />
                  </div>

                  {/* PRICE */}
                  <div className="text-right min-w-[140px]">
                    {item.labledPrice > item.price && (
                      <p className="text-sm line-through text-secondary/60">
                        LKR {(item.labledPrice * item.quantity).toFixed(2)}
                      </p>
                    )}
                    <p className="text-xl font-semibold text-accent">
                      LKR {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              {/* TOTAL */}
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row justify-between items-center gap-6">
                <span className="text-2xl font-bold text-accent">
                  Total: LKR {getTotal().toFixed(2)}
                </span>

                <Link
                  to="/checkout"
                  state={cart}
                  className="px-10 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-white hover:text-accent border border-accent transition"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
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
    </div>
  );
}
