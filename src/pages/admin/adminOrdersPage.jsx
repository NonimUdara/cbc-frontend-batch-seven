import axios from "axios";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (token == null) {
        toast.error("You must be logged in to add a product.");
        navigate("/login");
        return;
      }
      axios
        .get(import.meta.env.VITE_API_URL + "/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Orders fetched:", response.data);
          setOrders(response.data);
          setIsLoading(false);
        })
        .catch((error) => console.error("Error fetching orders:", error));
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full p-6 bg-primary min-h-screen flex justify-center">
      <OrderDetailsModal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        selectedOrder={selectedOrder}
        refresh={() => setIsLoading(true)}
      />

      <div className="w-full max-w-7xl h-[97%] bg-white rounded-2xl shadow-xl p-4">
        {/* Header with count */}
        <div className="flex items-center justify-between mb-6 border-b pb-3">
          <h1 className="text-2xl font-bold text-secondary">
            Orders Management
          </h1>
          <span className="text-sm text-gray-600 bg-primary px-4 py-1 rounded-full">
            Total:{" "}
            <span className="font-semibold text-secondary">
              {orders.length}
            </span>
          </span>
        </div>

        {/* Table container */}
        <div className="overflow-auto rounded-lg border border-gray-200">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-primary sticky top-0 z-10">
                <tr>
                  {[
                    "Order ID",
                    "number of Items",
                    "Customer Name",
                    "Email",
                    "Phone",
                    "Address",
                    "Total",
                    "Status",
                    "Date",
                  ].map((heading, index) => (
                    <th
                      key={index}
                      className="p-4 text-secondary font-semibold text-sm uppercase border-b"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <tr
                    key={index}
                    className={`transition-colors duration-300 hover:bg-[#FEF9F4] ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                    onClick={() => {
                      setSelectedOrder(item);
                      setIsModalOpen(true);
                    }}
                  >
                    <td className="p-4 border-b text-gray-700 text-sm">
                      {item.oderID}
                    </td>
                    <td className="p-4 border-b text-gray-700 font-sm">
                      {item.items.length}
                    </td>
                    <td className="p-4 border-b text-gray-700 text-sm">
                      {item.customerName}
                    </td>
                    <td className="p-4 border-b text-gray-700 text-sm">
                      {item.email}
                    </td>
                    <td className="p-4 border-b text-gray-700 text-sm">
                      {item.phone}
                    </td>
                    <td className="p-4 border-b text-gray-700 text-sm">
                      {item.address}
                    </td>
                    <td className="p-4 border-b text-gray-700 text-sm">{`LKR ${Number(
                      item.total
                    ).toFixed(2)}`}</td>
                    <td className="p-4 border-b text-gray-700 text-sm">
                      {item.status}
                    </td>
                    <td className="p-4 border-b text-gray-700 text-sm">
                      {new Date(item.date).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
