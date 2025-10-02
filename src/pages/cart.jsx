import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { addToCart, getTotal, loadCart } from "../utils/cart";
import { BiTrash } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(loadCart());

  return (
    <div className="w-full lg:h-[calc(100vh-100px)] bg-primary text-secondary flex flex-col pt-[25px] items-center ">
      <div className="w-[400px] lg:w-[600px] flex flex-col gap-4">
        {cart.map((item, index) => {
          return (
            <div
              className="w-full h-[300px] lg:h-[120px] bg-white flex flex-col lg:flex-row relative items-center p-3 lg:p-0 "
              key={index}
            >
              <button
                className="absolute text-red-500 right-[-40px] font-bold text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-[5px] "
                onClick={() => {
                  addToCart(item, -item.quantity);
                  setCart(loadCart());
                }}
              >
                <BiTrash />
              </button>
              <img
                src={item.image}
                alt=""
                className="h-[100px] lg:h-full aspect-square object-cover "
              />
              <div className="w-[200px] h-[100px] lg:h-full  flex flex-col pl-[5px] pt-[10px] ">
                <h1 className="w-full lg:w-[200px] text-center text-wrap text-xl font-semibold text-secondary ">
                  {item.name}
                </h1>
                <p className="text-sm text-secondary/70 text-center ">{item.productID}</p>
              </div>
              <div className="w-[100px] h-full flex flex-row lg:flex-col items-center justify-center ">
                <CiCircleChevUp
                  className="text-3xl "
                  onClick={() => {
                    addToCart(item, 1);
                    setCart(loadCart());
                  }}
                />
                <span className="text-2xl font-semibold ">{item.quantity}</span>
                <CiCircleChevDown
                  className="text-3xl "
                  onClick={() => {
                    addToCart(item, -1);
                    setCart(loadCart());
                  }}
                />
              </div>
              <div className="w-full lg:w-[180px] lg:h-full items-center justify-center flex flex-row lg:flex-col ">
                {item.labledPrice > item.price && (
                  <span className="text-xl font-semibold lg:w-full line-through text-center lg:text-right pr-[10px]">
                    LKR {item.labledPrice.toFixed(2) * item.quantity}
                  </span>
                )}
                <span className="text-2xl text-accent font-semibold lg:w-full text-center lg:text-right pr-[10px] ">
                  LKR {item.price.toFixed(2) * item.quantity}
                </span>
              </div>
            </div>
          );
        })}
        <div className="w-full h-[120px] bg-white flex flex-col-reverse lg:flex-row justify-end items-center relative ">
          <Link
            state={cart}
            to="/checkout"
            className="lg:absolute left-0 bg-accent text-white px-6 py-3 lg:ml-[20px] font-semibold "
          >
            Checkout
          </Link>
          <div className="h-[50px] text-center ">
            <span className="text-2xl font-semibold w-full text-center lg:text-right lg:pr-[10px] text-accent ">
              Total : LKR {getTotal().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
