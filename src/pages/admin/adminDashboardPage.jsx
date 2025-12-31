"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../../components/loader";
import { motion } from "framer-motion";
import { MdOutlineAdminPanelSettings, MdVerified } from "react-icons/md";

export default function AdminDashboardPage() {
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [revenueData, setRevenueData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }
    try {
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/users/all-users`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setProductsCount(productsRes.data.length);
      setOrdersCount(ordersRes.data.length);
      setUsersCount(usersRes.data.length);

      // Recent orders & users
      setRecentOrders(ordersRes.data.slice(-5).reverse());
      setRecentUsers(usersRes.data.slice(-5).reverse());

      // Revenue per day (last 7 days)
      const revenueMap = {};
      ordersRes.data.forEach((order) => {
        const date = new Date(order.date).toLocaleDateString("en-GB");
        revenueMap[date] = (revenueMap[date] || 0) + Number(order.total);
      });
      const chartData = Object.keys(revenueMap).map((key) => ({
        date: key,
        revenue: revenueMap[key],
      }));
      setRevenueData(chartData);

      setIsLoading(false);
    } catch {
      toast.error("Failed to load dashboard data");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  return (
    <motion.div
      className="w-full min-h-screen p-6 bg-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* ---------------- TOP SUMMARY CARDS ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h2 className="text-sm font-semibold text-gray-500 mb-2">Products</h2>
          <p className="text-2xl font-bold text-secondary">{productsCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h2 className="text-sm font-semibold text-gray-500 mb-2">Orders</h2>
          <p className="text-2xl font-bold text-secondary">{ordersCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h2 className="text-sm font-semibold text-gray-500 mb-2">Users</h2>
          <p className="text-2xl font-bold text-secondary">{usersCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h2 className="text-sm font-semibold text-gray-500 mb-2">Revenue</h2>
          <p className="text-2xl font-bold text-secondary">
            LKR {revenueData.reduce((sum, d) => sum + d.revenue, 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* ---------------- SIMPLE REVENUE CHART ---------------- */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-secondary mb-4">Revenue Chart (Last 7 Days)</h2>
        <div className="h-48 w-full relative">
          {revenueData.length === 0 ? (
            <p className="text-center text-gray-400 mt-12">No data to display</p>
          ) : (
            <div className="flex h-full items-end gap-2">
              {revenueData.map((d, idx) => (
                <div key={idx} className="flex-1">
                  <div
                    className="bg-accent rounded-t-md"
                    style={{
                      height: `${(d.revenue / Math.max(...revenueData.map((x) => x.revenue))) * 100}%`,
                    }}
                  />
                  <p className="text-xs text-center mt-1">{d.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ---------------- RECENT ORDERS & USERS ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-4 overflow-auto">
          <h2 className="text-lg font-semibold text-secondary mb-3">Recent Orders</h2>
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                {["Order ID", "Customer", "Total", "Status"].map((h) => (
                  <th key={h} className="p-3 text-sm font-semibold text-center">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors duration-300 hover:bg-[#FEF9F4] ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3 text-center">{o.oderID}</td>
                  <td className="p-3 text-center">{o.customerName}</td>
                  <td className="p-3 text-center">LKR {Number(o.total).toFixed(2)}</td>
                  <td className="p-3 text-center">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 overflow-auto">
          <h2 className="text-lg font-semibold text-secondary mb-3">Recent Users</h2>
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                {["Email", "Name", "Role"].map((h) => (
                  <th key={h} className="p-3 text-sm font-semibold text-center">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors duration-300 hover:bg-[#FEF9F4] ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3 text-center">{u.email}</td>
                  <td className="p-3 text-center">{u.firstName} {u.lastName}</td>
                  <td className="p-3 text-center">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
