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
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state || []);
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");

  // 🧮 Calculate Total
  function getTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // 🛒 Place Order
  async function purchaseCart() {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("You must be logged in to place an order.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (address.trim() === "") {
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
          customerName: name === "" ? null : name,
          items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order placed successfully");

      // 🧹 Clear cart after successful order
      setCart([]);
      localStorage.removeItem("cart");

      navigate("/"); // Redirect to homepage
    } catch (error) {
      console.error(error);
      toast.error("Error placing order");

      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div className="w-full lg:h-[calc(100vh-100px)] overflow-y-scroll bg-primary text-secondary flex flex-col pt-[25px] items-center">
      <div className="w-[400px] h-full lg:w-[600px] flex flex-col gap-4">
        {cart.length === 0 ? (
          <div className="text-center text-xl font-semibold text-white">
            Your cart is empty.
          </div>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              className="w-full h-[300px] lg:h-[120px] bg-white flex flex-col lg:flex-row relative items-center p-3 lg:p-0"
            >
              {/* 🗑 Remove Item */}
              <button
                className="absolute text-red-500 right-[-40px] font-bold text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-[5px]"
                onClick={() => {
                  const newCart = [...cart];
                  newCart.splice(index, 1);
                  setCart(newCart);
                  localStorage.setItem("cart", JSON.stringify(newCart));
                }}
              >
                <BiTrash />
              </button>

              {/* 🖼 Product Image */}
              <img
                src={item.image}
                alt=""
                className="h-[100px] lg:h-full aspect-square object-cover"
              />

              {/* 📦 Product Info */}
              <div className="w-[200px] h-[100px] lg:h-full flex flex-col pl-[5px] pt-[10px]">
                <h1 className="w-full lg:w-[200px] text-center text-wrap text-xl font-semibold text-secondary">
                  {item.name}
                </h1>
                <p className="text-sm text-secondary/70 text-center lg:text-left">
                  {item.productID}
                </p>
              </div>

              {/* 🔼🔽 Quantity Control */}
              <div className="w-[100px] h-full flex flex-row lg:flex-col items-center justify-center">
                <CiCircleChevUp
                  className="text-3xl cursor-pointer"
                  onClick={() => {
                    const newCart = [...cart];
                    newCart[index].quantity += 1;
                    setCart(newCart);
                    localStorage.setItem("cart", JSON.stringify(newCart));
                  }}
                />
                <span className="text-2xl font-semibold">{item.quantity}</span>
                <CiCircleChevDown
                  className="text-3xl cursor-pointer"
                  onClick={() => {
                    const newCart = [...cart];
                    if (newCart[index].quantity > 1) {
                      newCart[index].quantity -= 1;
                      setCart(newCart);
                      localStorage.setItem("cart", JSON.stringify(newCart));
                    }
                  }}
                />
              </div>

              {/* 💰 Price */}
              <div className="w-full lg:w-[180px] lg:h-full flex flex-row lg:flex-col items-center justify-center">
                {item.labledPrice > item.price && (
                  <span className="text-xl font-semibold lg:w-full line-through text-center lg:text-right pr-[10px]">
                    LKR {(item.labledPrice * item.quantity).toFixed(2)}
                  </span>
                )}
                <span className="text-2xl text-accent font-semibold lg:w-full text-center lg:text-right pr-[10px]">
                  LKR {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))
        )}

        {/* 🧍 Name Field */}
        {cart.length > 0 && (
          <div className="w-full h-[120px] bg-white flex flex-col-reverse lg:flex-row justify-end items-center relative">
            <div className="w-full h-full flex-row lg:flex justify-between items-center p-4 ">
              <label htmlFor="name" className="text-sm text-secondary mr-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="w-[370px] h-[50px] border border-secondary/50 text-center rounded-md px-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* 🏠 Address Field */}
        {cart.length > 0 && (
          <div className="w-full h-[200px] bg-white flex flex-col-reverse lg:flex-row justify-end items-center relative">
            <div className="w-full h-full flex-row lg:flex justify-between items-center p-4 ">
              <label
                htmlFor="address"
                className="text-sm text-secondary mr-2"
              >
                Shipping Address:
              </label>
              <input
                type="text"
                id="address"
                className="w-[370px] h-[120px] border border-secondary/50 text-center rounded-md px-3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* 🧾 Total + Order Button */}
        {cart.length > 0 && (
          <div className="w-full h-[120px] bg-white flex flex-col-reverse lg:flex-row justify-end items-center relative">
            <button
              onClick={purchaseCart}
              className="lg:absolute left-0 bg-accent text-white px-6 py-3 lg:ml-[20px] font-semibold"
            >
              Order
            </button>
            <div className="h-[50px] text-center">
              <span className="text-2xl font-semibold w-full text-center lg:text-right lg:pr-[10px] text-accent">
                Total : LKR {getTotal().toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

