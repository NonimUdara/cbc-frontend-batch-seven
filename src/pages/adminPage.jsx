import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { BsBox2Heart } from "react-icons/bs";
import { PiUsersThreeLight } from "react-icons/pi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

import AdminProductPage from "./admin/adminProductPage";
import AdminAddnewProduct from "./admin/adminAddNewProduct";
import AdminUpdateProduct from "./admin/adminUpdateProduct";
import AdminOrdersPage from "./admin/adminOrdersPage";
import AdminUsersPage from "./admin/usersPage";
import { Loader } from "../components/loader";
import AdminDashboardPage from "./admin/adminDashboardPage";

export default function AdminPage() {
  const navigate = useNavigate();
  const [userLoaded, setUserLoaded] = useState(false);

  /* ---------------- AUTH CHECK ---------------- */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be an admin.");
      navigate("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.role !== "admin") {
          toast.error("Admin access only");
          navigate("/");
          return;
        }
        setUserLoaded(true);
      })
      .catch(() => {
        toast.error("Session expired");
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  /* ---------------- UI ---------------- */
  return (
    <div className="h-screen w-full flex bg-primary text-secondary overflow-hidden">
      {/* ---------------- SIDEBAR (NO SCROLL) ---------------- */}
      <aside className="w-72 h-full hidden md:flex flex-col p-4 gap-4 border-r border-accent/30 bg-primary">
        {/* Logo */}
        <div className="bg-accent rounded-2xl p-4 flex flex-col items-center shadow-lg">
          <span className="text-white text-xl font-bold">
            Admin Dashboard
          </span>
          <img
            src="/logo.png"
            alt="CBC"
            className="h-20 mt-3 object-contain"
          />
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-2 mt-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent hover:text-white transition"
          >
            <FaChartLine /> Dashboard
          </Link>

          <Link
            to="/admin/orders"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent hover:text-white transition"
          >
            <MdShoppingCartCheckout /> Orders
          </Link>

          <Link
            to="/admin/products"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent hover:text-white transition"
          >
            <BsBox2Heart /> Products
          </Link>

          <Link
            to="/admin/users"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent hover:text-white transition"
          >
            <PiUsersThreeLight /> Users
          </Link>
        </nav>
      </aside>

      {/* ---------------- RIGHT CONTENT (SCROLL ONLY HERE) ---------------- */}
      <main className="flex-1 h-full overflow-hidden p-4 md:p-6">
        <div className="bg-white rounded-2xl shadow-xl h-full overflow-y-auto p-6">
          {!userLoaded ? (
            <Loader />
          ) : (
            <Routes>
              <Route path="/" element={<h1 className="text-2xl font-bold">Dashboard</h1>} />
              <Route path="/orders" element={<AdminOrdersPage />} />
              <Route path="/products" element={<AdminProductPage />} />
              <Route path="/add-product" element={<AdminAddnewProduct />} />
              <Route path="/update-product" element={<AdminUpdateProduct />} />
              <Route path="/users" element={<AdminUsersPage />} />
              <Route path="/dashboard" element={<AdminDashboardPage />} />
            </Routes>
          )}
        </div>
      </main>
    </div>
  );
}
