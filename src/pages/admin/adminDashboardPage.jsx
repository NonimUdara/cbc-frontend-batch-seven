import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../../components/loader";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen, FaUsers, FaShoppingCart, FaDollarSign, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const [ordersRes, usersRes, productsRes] = await Promise.all([
        axios.get(import.meta.env.VITE_API_URL + "/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(import.meta.env.VITE_API_URL + "/api/users/all-users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(import.meta.env.VITE_API_URL + "/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setOrders(ordersRes.data);
      setUsers(usersRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Prepare data for charts
  const ordersChartData = orders.map((order) => ({
    date: new Date(order.date).toLocaleDateString("en-GB"),
    total: order.total,
  }));

  const usersRoleData = [
    { name: "Admin", value: users.filter((u) => u.role === "admin").length },
    { name: "User", value: users.filter((u) => u.role === "user").length },
  ];

  const COLORS = ["#FA812F", "#4A90E2"];

  const totalRevenue = orders.reduce((acc, order) => acc + Number(order.total), 0);
  const activeOrders = orders.filter((o) => o.status === "pending").length;
  const lowStockProducts = products.filter((p) => p.stock < 10).length;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="w-full h-full p-6 flex flex-col gap-6 overflow-auto">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-orange-400 to-orange-300 shadow-lg rounded-xl p-6 flex items-center gap-4 text-white">
          <FaShoppingCart size={36} />
          <div>
            <div className="text-sm opacity-80">Total Orders</div>
            <div className="text-2xl font-bold">{orders.length}</div>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-blue-400 to-blue-300 shadow-lg rounded-xl p-6 flex items-center gap-4 text-white">
          <FaUsers size={36} />
          <div>
            <div className="text-sm opacity-80">Total Users</div>
            <div className="text-2xl font-bold">{users.length}</div>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-green-400 to-green-300 shadow-lg rounded-xl p-6 flex items-center gap-4 text-white">
          <FaBoxOpen size={36} />
          <div>
            <div className="text-sm opacity-80">Total Products</div>
            <div className="text-2xl font-bold">{products.length}</div>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-purple-400 to-purple-300 shadow-lg rounded-xl p-6 flex items-center gap-4 text-white">
          <FaDollarSign size={36} />
          <div>
            <div className="text-sm opacity-80">Revenue</div>
            <div className="text-2xl font-bold">LKR {totalRevenue.toFixed(2)}</div>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-red-400 to-red-300 shadow-lg rounded-xl p-6 flex items-center gap-4 text-white">
          <FaExclamationTriangle size={36} />
          <div>
            <div className="text-sm opacity-80">Low Stock</div>
            <div className="text-2xl font-bold">{lowStockProducts}</div>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="font-semibold text-secondary mb-4">Orders Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersChartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#FA812F" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Users Role Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="font-semibold text-secondary mb-4">Users by Role</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={usersRoleData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {usersRoleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="bg-white shadow-lg rounded-xl p-6 overflow-auto">
          <h3 className="font-semibold text-secondary mb-4">Recent Orders</h3>
          <table className="w-full text-left">
            <thead>
              <tr>
                {["ID", "Customer", "Total", "Status"].map((h) => (
                  <th key={h} className="text-sm text-gray-500 py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((o, idx) => (
                <tr
                  key={idx}
                  className={`cursor-pointer hover:bg-[#FEF9F4] transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-2">{o.oderID}</td>
                  <td className="py-2">{o.customerName}</td>
                  <td className="py-2">LKR {Number(o.total).toFixed(2)}</td>
                  <td className="py-2">
                    <span className="px-2 py-1 rounded-full bg-accent/20 text-accent text-xs">
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Users */}
        <div className="bg-white shadow-lg rounded-xl p-6 overflow-auto">
          <h3 className="font-semibold text-secondary mb-4">Recent Users</h3>
          <table className="w-full text-left">
            <thead>
              <tr>
                {["Email", "Name", "Role"].map((h) => (
                  <th key={h} className="text-sm text-gray-500 py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 5).map((u, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-[#FEF9F4] transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">{u.firstName} {u.lastName}</td>
                  <td className="py-2">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Products */}
        <div className="bg-white shadow-lg rounded-xl p-6 overflow-auto">
          <h3 className="font-semibold text-secondary mb-4">Recent Products</h3>
          <table className="w-full text-left">
            <thead>
              <tr>
                {["Name", "Price", "Stock"].map((h) => (
                  <th key={h} className="text-sm text-gray-500 py-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map((p, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-[#FEF9F4] transition ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-2">{p.name}</td>
                  <td className="py-2">${p.price}</td>
                  <td className="py-2">{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
