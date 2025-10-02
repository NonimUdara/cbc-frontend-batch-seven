import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-accent h-[100px] text-white px-[40px]">
      <div className="w-full h-full flex items-center relative  ">
        <img
          src="/logo.png"
          alt=""
          className="hidden lg:block h-full absolute w-[170px] left-0 object-cover "
        />
        <div className="lg:hidden w-full flex justify-center">
          <img
          src="/logo.png"
          alt=""
          className="h-full w-[170px] object-cover"
        />
        </div>
        
        <div className="hidden h-full lg:flex justify-center items-center w-full text-lg gap-[20px]">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <Link className="hidden h-full lg:flex justify-center items-center absolute right-0 " to="/cart">
          <BsCart3 className="text-3xl" />
        </Link>
      </div>
    </header>
  );
}
