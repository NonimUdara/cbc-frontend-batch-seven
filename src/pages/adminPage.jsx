import { Routes, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { PiUsersThreeLight } from "react-icons/pi";
import AdminProductPage from "./admin/adminProductPage";
import AdminAddnewProduct from "./admin/adminAddNewProduct";
import AdminUpdateProduct from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/adminOrdersPage";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../components/loader";


export default function AdminPage() {

    const navigate = useNavigate();
    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token === null) {
            toast.error("You must be an admin.");
            navigate("/login");
            return;
        }
        axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
    }).then((res) => {
            if (res.data.role !== "admin") {
                toast.error("You must be an admin to access the admin page.");
                navigate("/");
                return;
            }
            setUserLoaded(true);
    }).catch((err) => {
            console.log(err);
            toast.error("Error loading user.");
            navigate("/login");
            return;
        });
    }, []);

    return (
        <div className="bg-primary w-full h-full flex p-2 text-secondary">
            <div className="w-[300px] h-full flex flex-col bg-primary items-center gap-[20px]" >
                <div className="flex flex-col w-[85%] h-[100px] bg-accent items-center rounded-2xl mb-[20px]">
                    <span className="text-white text-xl font-bold ml-4 p-4">Admin Dashboard </span>
                    <div className="w-full h-full flex justify-center items-center ">
                        <img src="/logo.png" alt="CBC - Crystal Beauty Clear" className="h-[110px] mb-20" />
                    </div>
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
                    <PiUsersThreeLight className="text-xl" />
                    Users
                </Link>
            </div>
            <div className="w-[calc(100%-300px)] h-full bg-primary border-[4px] border-accent rounded-[20px] overflow-hidden " >
                <div className="w-full max-w-full h-full max-h-full overflow-y-scroll ">
                    {userLoaded? <Routes path="/" >
                        <Route path="/*" element={<h1>Dashboard</h1>} />
                        <Route path="/products" element={<AdminProductPage />} />
                        <Route path="/orders" element={<AdminOrdersPage />} />
                        <Route path="/add-product" element={<AdminAddnewProduct />} />
                        <Route path="/update-product" element={<AdminUpdateProduct />} />
                    </Routes> : <Loader />}
                </div>
            </div>
        </div>
    );
}