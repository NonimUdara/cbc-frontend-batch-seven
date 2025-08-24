import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { PiUsersThreeLight } from "react-icons/pi";

export default function AdminPage() {
    return (
        <div className="bg-primary w-full h-full flex p-2 text-secondary">
            <div className="w-[300px] h-full flex flex-col bg-primary items-center gap-[20px]" >
                <div className="flex flex-row w-[90%] h-[70px] bg-accent items-center rounded-2xl mb-[20px]">
                    <img src="/logo.png" alt="CBC - Crystal Beauty Clear" className="h-[100px]" />
                    <span className="text-white text-xl ml-4">Admin </span>
                </div>
                <Link to="/admin" className="w-[90%] flex items-center gap-2 px-4 rounded-lg">
                    <FaChartLine className="text-xl" />
                    Dashboard
                </Link>
                <Link to="/admin/orders" className="w-[90%] flex items-center gap-2 px-4 rounded-lg">
                    <MdShoppingCartCheckout className="text-xl" />
                    Orders
                </Link>
                <Link to="/admin/products" className="w-[90%] flex items-center gap-2 px-4 rounded-lg">
                    <BsBox2Heart className="text-xl" />
                    Products
                </Link>
                <Link to="/admin/users" className="w-[90%] flex items-center gap-2 px-4 rounded-lg">
                    <PiUsersThreeLight  className="text-xl" />
                    Users
                </Link>
            </div>
            <div className="w-[calc(100%-300px)] h-full bg-primary border-[4px] border-accent rounded-[20px] overflow-hidden " >
                <div className="w-full max-w-full h-full max-h-full overflow-y-scroll ">
                    <Routes path="/" >
                        <Route path="/" element={<h1>Dashboard</h1>} />
                        <Route path="/products" element={<h1>Products</h1>} />
                        <Route path="/orders" element={<h1>Orders</h1>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}