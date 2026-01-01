import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/loader";
import Footer from "../components/footer";
import { motion } from "framer-motion";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to view your orders");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    axios
      .get(import.meta.env.VITE_API_URL + "/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load your orders");
        setIsLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col">
      {/* HEADER */}
      <section className="px-4 sm:px-6 py-10 max-w-6xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-secondary mb-2">
          My Orders
        </h1>
        <p className="text-secondary/70">
          Track and review your recent purchases
        </p>
      </section>

      {/* CONTENT */}
      <section className="flex-1 px-4 sm:px-6 pb-20 max-w-6xl mx-auto w-full">
        {/* Loader */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-2xl font-semibold mb-3">No orders yet</h2>
            <p className="text-secondary/70 mb-6">
              You haven’t placed any orders yet.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent/90 transition"
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* Orders List */}
        {!isLoading && orders.length > 0 && (
          <div className="flex flex-col gap-6">
            {orders.map((order, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg p-6 border"
              >
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                  <div>
                    <p className="text-sm text-secondary/60">Order ID</p>
                    <p className="font-semibold text-secondary">{order.oderID}</p>
                  </div>
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-sm font-semibold w-fit ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : order.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-secondary/80 mb-4">
                  <p>
                    <b>Name:</b> {order.customerName}
                  </p>
                  <p>
                    <b>Email:</b> {order.email}
                  </p>
                  <p>
                    <b>Phone:</b> {order.phone}
                  </p>
                  <p>
                    <b>Address:</b> {order.address}
                  </p>
                  <p>
                    <b>Date:</b> {order.date}
                  </p>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <h3 className="font-semibold text-secondary mb-2">Items</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-3 items-center border p-2 rounded-lg"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex flex-col">
                          <p className="font-semibold text-secondary">{item.name}</p>
                          <p className="text-secondary/70">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-secondary/70">
                            Price: LKR {item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="text-right text-secondary font-semibold text-lg">
                  Total: LKR {Number(order.total).toFixed(2)}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
