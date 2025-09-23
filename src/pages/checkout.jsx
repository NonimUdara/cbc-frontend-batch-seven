import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage() {
  const location = useLocation();

  const [cart, setCart] = useState(location.state);
  const navigate = useNavigate();

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  async function purchaseCart() {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("You must be logged in to add a product.");
      navigate("/login");
      return;
    }

    try {
      const items = [];

      for (let i = 0; i < cart.length; i++) {
        items.push({
          productID: cart[i].productID,
          quantity: cart[i].quantity,
        });
      }
      
      await axios.post(
        import.meta.env.VITE_API_URL + "/api/orders",
        {
          address: "No 123, Colombo, Sri Lanka",
          items: items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order placed successfully");

    } catch (error) {
      toast.error("Error fetching products");
      console.log(error);
      //if error is 400
      if (error.response && error.response.status == 400) {

        toast.error(error.response.data.message);

      }
    }
  }

  return (
    <div className="w-full h-[calc(100vh-100px)] bg-primary text-secondary flex flex-col pt-[25px] items-center ">
      <div className="w-[600px] flex flex-col gap-4 ">
        {cart.map((item, index) => {
          return (
            <div
              className="w-full h-[120px] bg-white flex relative items-center "
              key={index}
            >
              <button
                className="absolute text-red-500 right-[-40px] font-bold text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-[5px] "
                onClick={() => {
                  const newCart = cart;
                }}
              >
                <BiTrash />
              </button>
              <img
                src={item.image}
                alt=""
                className="h-full aspect-square object-cover "
              />
              <div className="w-[200px] h-full flex flex-col pl-[5px] pt-[10px] ">
                <h1 className="w-full text-wrap text-xl font-semibold text-secondary ">
                  {item.name}
                </h1>
                <p className="text-sm text-secondary/70 ">{item.productID}</p>
              </div>
              <div className="w-[100px] h-full flex flex-col items-center justify-center ">
                <CiCircleChevUp
                  className="text-3xl "
                  onClick={() => {
                    const newCart = [...cart];

                    newCart[index].quantity += 1;

                    setCart(newCart);
                  }}
                />
                <span className="text-2xl font-semibold ">{item.quantity}</span>
                <CiCircleChevDown
                  className="text-3xl "
                  onClick={() => {
                    const newCart = [...cart];

                    if (newCart[index].quantity > 1) {
                      newCart[index].quantity -= 1;
                    }

                    setCart(newCart);
                  }}
                />
              </div>
              <div className="w-[180px] h-full flex flex-col ">
                {item.labledPrice > item.price && (
                  <span className="text-xl font-semibold w-full line-through text-right pr-[10px] mt-[20px] ">
                    LKR {item.labledPrice.toFixed(2) * item.quantity}
                  </span>
                )}
                <span className="text-2xl text-accent font-semibold w-full text-right pr-[10px] ">
                  LKR {item.price.toFixed(2) * item.quantity}
                </span>
              </div>
            </div>
          );
        })}
        <div className="w-full h-[120px] bg-white flex justify-end items-center relative ">
          <button
            to="/checkout"
            onClick={purchaseCart}
            className="absolute left-0 bg-accent text-white px-6 py-3 ml-[20px] font-semibold "
          >
            order
          </button>
          <div className="h-[50px] ">
            <span className="text-2xl font-semibold w-full text-right pr-[10px] text-accent ">
              Total : LKR {getTotal().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
