import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Footer from "../components/footer";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cart, setCart] = useState(location.state || []);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function getTotal() {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  async function purchaseCart() {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in to place an order.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!address.trim()) {
      toast.error("Please enter your shipping address.");
      return;
    }

    if (!phone) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      const items = cart.map((item) => ({
        productID: item.productID,
        quantity: item.quantity,
      }));

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/orders",
        {
          address,
          customerName: name || null,
          phone,
          items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order placed successfully 🎉");
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/");
    } catch (error) {
      toast.error("Error placing order");
    }
  }

  return (
    <div className="w-full min-h-screen bg-primary text-secondary flex flex-col">
      {/* CONTENT */}
      <div className="flex-1 flex justify-center px-4 py-16">
        <div className="w-full max-w-4xl flex flex-col gap-8">

          {/* EMPTY CART */}
          {cart.length === 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <h1 className="text-3xl font-bold mb-4">
                Your checkout is empty
              </h1>
              <p className="text-secondary/70 mb-8">
                Please add items to your cart before checkout.
              </p>
              <Link
                to="/products"
                className="inline-block px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition"
              >
                Browse Products
              </Link>
            </div>
          )}

          {/* CART ITEMS */}
          {cart.length > 0 && (
            <>
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row items-center gap-6 relative"
                >
                  <button
                    className="absolute top-4 right-4 text-red-500 text-xl hover:scale-110 transition"
                    onClick={() => {
                      const updated = cart.filter((_, i) => i !== index);
                      setCart(updated);
                      localStorage.setItem("cart", JSON.stringify(updated));
                    }}
                  >
                    <BiTrash />
                  </button>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />

                  <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-sm text-secondary/60">
                      {item.productID}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <CiCircleChevUp
                      className="text-3xl cursor-pointer hover:text-accent"
                      onClick={() => {
                        const updated = [...cart];
                        updated[index].quantity += 1;
                        setCart(updated);
                        localStorage.setItem("cart", JSON.stringify(updated));
                      }}
                    />
                    <span className="text-xl font-semibold">
                      {item.quantity}
                    </span>
                    <CiCircleChevDown
                      className="text-3xl cursor-pointer hover:text-accent"
                      onClick={() => {
                        if (item.quantity > 1) {
                          const updated = [...cart];
                          updated[index].quantity -= 1;
                          setCart(updated);
                          localStorage.setItem("cart", JSON.stringify(updated));
                        }
                      }}
                    />
                  </div>

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

              {/* CUSTOMER DETAILS */}
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Customer Details</h3>

                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 border border-secondary/40 rounded-lg px-4"
                />

                <input
                  type="tel"
                  placeholder="Phone number (10 digits)"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) {
                      setPhone(value);
                    }
                  }}
                  className="h-12 border border-secondary/40 rounded-lg px-4"
                  maxLength={10}
                />

                <textarea
                  placeholder="Shipping address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-32 border border-secondary/40 rounded-lg px-4 py-3 resize-none"
                />
              </div>

              {/* SUMMARY */}
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row justify-between items-center gap-6">
                <span className="text-2xl font-bold text-accent">
                  Total: LKR {getTotal().toFixed(2)}
                </span>

                <button
                  onClick={purchaseCart}
                  className="px-10 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-white hover:text-accent border border-accent transition"
                >
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
