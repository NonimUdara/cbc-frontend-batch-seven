import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import OrderDetailsModal from "../../components/orderInfoModel";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  /* ---------------- FETCH ORDERS FUNCTION ---------------- */
  const fetchOrders = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
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
        toast.error("Failed to load orders");
        setIsLoading(false);
      });
  }, [navigate]);

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="w-full h-full flex flex-col gap-6 overflow-hidden">
      {/* MODAL */}
      <OrderDetailsModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        selectedOrder={selectedOrder}
        refresh={fetchOrders}   // ✅ FIXED
      />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-secondary">
          Orders Management
        </h1>

        <div className="bg-primary px-4 py-1 rounded-full text-sm">
          Total Orders:{" "}
          <span className="font-semibold text-secondary">
            {orders.length}
          </span>
        </div>
      </div>

      {/* CONTENT AREA (SCROLL ENABLED HERE) */}
      <div className="flex-1 overflow-y-auto pr-1">
        {/* LOADER */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        )}

        {/* ---------------- DESKTOP TABLE ---------------- */}
        {!isLoading && (
          <div className="hidden lg:block bg-white rounded-xl shadow-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-primary sticky top-0 z-10">
                  <tr>
                    {[
                      "Order ID",
                      "Items",
                      "Customer",
                      "Email",
                      "Phone",
                      "Address",
                      "Total",
                      "Status",
                      "Date",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-sm font-semibold text-secondary"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsModalOpen(true);
                      }}
                      className={`cursor-pointer hover:bg-[#FEF9F4] transition ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-3 text-sm">{order.oderID}</td>
                      <td className="px-4 py-3 text-sm">
                        {order.items.length}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {order.customerName}
                      </td>
                      <td className="px-4 py-3 text-sm">{order.email}</td>
                      <td className="px-4 py-3 text-sm">{order.phone}</td>
                      <td className="px-4 py-3 text-sm truncate max-w-[180px]">
                        {order.address}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold">
                        LKR {Number(order.total).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {new Date(order.date).toLocaleDateString("en-GB")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ---------------- MOBILE CARDS ---------------- */}
        {!isLoading && (
          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {orders.map((order, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedOrder(order);
                  setIsModalOpen(true);
                }}
                className="bg-white rounded-xl shadow-md border p-4 cursor-pointer hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-secondary">
                    {order.customerName}
                  </span>
                  <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                    {order.status}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p><b>Order ID:</b> {order.oderID}</p>
                  <p><b>Items:</b> {order.items.length}</p>
                  <p><b>Total:</b> LKR {Number(order.total).toFixed(2)}</p>
                  <p>
                    <b>Date:</b>{" "}
                    {new Date(order.date).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
