import { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import UserData from "./userData";

export default function Header() {

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <header className="w-full bg-accent h-[100px] text-white px-[40px]">
      <div className="w-full h-full flex items-center relative  ">
        <img
          src="/logo.png"
          alt=""
          className="hidden lg:block h-full absolute w-[170px] left-0 object-cover "
        />
        <div className="lg:hidden w-full flex justify-center relative items-center">
          <MdMenu
            className="absolute left-0 text-3xl"
            onClick={() => setIsSideBarOpen(true)}
          />
          <img
            src="/logo.png"
            alt=""
            className="h-full w-[170px] object-cover"
          />
        </div>

        {isSideBarOpen && (
          <div className="fixed top-0 left-0 h-screen w-full bg-black/50 text-secondary z-100">
            <div className="w-[300px] bg-primary h-full flex flex-col">
              <div className="lg:hidden w-full flex bg-accent justify-center relative items-center">
                <MdMenu
                  className="absolute left-2 text-white text-3xl"
                  onClick={() => setIsSideBarOpen(false)}
                />
                <img
                  src="/logo.png"
                  alt=""
                  className="h-[100px] w-[170px] object-cover"
                />
                {/* <a href="/cart" className="">
                  <BsCart3 className="text-2xl" />
                </a> */}
              </div>
              <a className="p-4 border-b border-b-secondary/20 hover:bg-accent/20">
                <UserData />
              </a>
              <a href="/" className="p-4 border-b border-b-secondary/20 hover:bg-accent/20">
                Home
              </a>
              <a href="/products" className="p-4 border-b border-b-secondary/20 hover:bg-accent/20">
                Products
              </a>
              <a href="/about" className="p-4 border-b border-b-secondary/20 hover:bg-accent/20">
                About
              </a>
              <a href="/contact" className="p-4 border-b border-b-secondary/20 hover:bg-accent/20">
                Contact
              </a>
              <a href="/cart" className="p-4 border-b border-b-secondary/20 hover:bg-accent/20">
                Cart
              </a>
            </div>
          </div>
        )}

        <div className="hidden h-full lg:flex justify-center items-center w-full text-lg gap-[20px]">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="h-full w-[200px] absolute right-[100px] hidden lg:flex justify-end items-center">
          <UserData />
        </div>
        <Link
          className="hidden h-full lg:flex justify-center items-center absolute right-0 "
          to="/cart"
        >
          <BsCart3 className="text-3xl" />
        </Link>
      </div>
    </header>
  );
}
