// import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
// import { BiTrash } from "react-icons/bi";
// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";

// export default function CheckoutPage() {
//   const location = useLocation();
//   const [cart, setCart] = useState(location.state);
//   const navigate = useNavigate();
//   const [address, setAddress] = useState("");
//   const [name, setName] = useState("");

//   function getTotal() {
//     let total = 0;
//     cart.forEach((item) => {
//       total += item.price * item.quantity;
//     });
//     return total;
//   }

//   async function purchaseCart() {
//     const token = localStorage.getItem("token");
//     if (token == null) {
//       toast.error("You must be logged in to add a product.");
//       navigate("/login");
//       return;
//     }

//     try {
//       const items = [];

//       for (let i = 0; i < cart.length; i++) {
//         items.push({
//           productID: cart[i].productID,
//           quantity: cart[i].quantity,
//         });
//       }

//       await axios.post(
//         import.meta.env.VITE_API_URL + "/api/orders",
//         {
//           address: address,
//           customerName: name==""?null:name,
//           items: items,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success("Order placed successfully");
//     } catch (error) {
//       toast.error("Error placing order");
//       console.log(error);
//       if (error.response && error.response.status == 400) {
//         toast.error(error.response.data.message);
//       }
//     }
//   }

//   return (
//     <div className="w-full lg:h-[calc(100vh-100px)] overflow-y-scroll bg-primary text-secondary flex flex-col pt-[25px] items-center">
//       <div className="w-[400px] h-full lg:w-[600px] flex flex-col gap-4">
//         {cart.map((item, index) => (
//           <div
//             key={index}
//             className="w-full h-[300px] lg:h-[120px] bg-white flex flex-col lg:flex-row relative items-center p-3 lg:p-0"
//           >
//             <button
//               className="absolute text-red-500 right-[-40px] font-bold text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-[5px]"
//               onClick={() => {
//                 const newCart = [...cart];
//                 newCart.splice(index, 1);
//                 setCart(newCart);
//               }}
//             >
//               <BiTrash />
//             </button>

//             <img
//               src={item.image}
//               alt=""
//               className="h-[100px] lg:h-full aspect-square object-cover"
//             />

//             <div className="w-[200px] h-[100px] lg:h-full flex flex-col pl-[5px] pt-[10px]">
//               <h1 className="w-full lg:w-[200px] text-center text-wrap text-xl font-semibold text-secondary">
//                 {item.name}
//               </h1>
//               <p className="text-sm text-secondary/70 text-center lg:text-left">
//                 {item.productID}
//               </p>
//             </div>

//             <div className="w-[100px] h-full flex flex-row lg:flex-col items-center justify-center">
//               <CiCircleChevUp
//                 className="text-3xl"
//                 onClick={() => {
//                   const newCart = [...cart];
//                   newCart[index].quantity += 1;
//                   setCart(newCart);
//                 }}
//               />
//               <span className="text-2xl font-semibold">{item.quantity}</span>
//               <CiCircleChevDown
//                 className="text-3xl"
//                 onClick={() => {
//                   const newCart = [...cart];
//                   if (newCart[index].quantity > 1) {
//                     newCart[index].quantity -= 1;
//                     setCart(newCart);
//                   }
//                 }}
//               />
//             </div>

//             <div className="w-full lg:w-[180px] lg:h-full flex flex-row lg:flex-col items-center justify-center">
//               {item.labledPrice > item.price && (
//                 <span className="text-xl font-semibold lg:w-full line-through text-center lg:text-right pr-[10px]">
//                   LKR {(item.labledPrice * item.quantity).toFixed(2)}
//                 </span>
//               )}
//               <span className="text-2xl text-accent font-semibold lg:w-full text-center lg:text-right pr-[10px]">
//                 LKR {(item.price * item.quantity).toFixed(2)}
//               </span>
//             </div>
//           </div>
//         ))}

//         <div className="w-full h-[120px] bg-white flex flex-col-reverse lg:flex-row justify-end items-center relative">
//           <div className="w-full h-full flex-row lg:flex justify-between items-center p-4 ">
//             <label
//               htmlFor="name"
//               className="text-sm text-secondary mr-2"
//             >
//               Name:
//             </label>
//             <input
//               type="text"
//               id="name"
//               className="w-[370px] h-[50px] border border-secondary/50 text-center rounded-md px-3"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="w-full h-[200px] bg-white flex flex-col-reverse lg:flex-row justify-end items-center relative">
//           <div className="w-full h-full flex-row lg:flex justify-between items-center p-4 ">
//             <label
//               htmlFor="address"
//               className="text-sm text-secondary mr-2"
//             >
//               Shipping Address:
//             </label>
//             <input
//               type="text"
//               id="address"
//               className="w-[370px] h-[120px] border border-secondary/50 text-center rounded-md px-3"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="w-full h-[120px] bg-white flex flex-col-reverse lg:flex-row justify-end items-center relative">
//           <button
//             onClick={purchaseCart}
//             className="lg:absolute left-0 bg-accent text-white px-6 py-3 lg:ml-[20px] font-semibold"
//           >
//             Order
//           </button>
//           <div className="h-[50px] text-center">
//             <span className="text-2xl font-semibold w-full text-center lg:text-right lg:pr-[10px] text-accent">
//               Total : LKR {getTotal().toFixed(2)}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state || []);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

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

          {/* EMPTY */}
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

          {/* ITEMS */}
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

              {/* CUSTOMER INFO */}
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Customer Details</h3>

                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 border border-secondary/40 rounded-lg px-4"
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


