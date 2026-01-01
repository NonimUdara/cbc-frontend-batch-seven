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
import Footer from "../components/footer";

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
      <Footer />
    </div>
  );
}
