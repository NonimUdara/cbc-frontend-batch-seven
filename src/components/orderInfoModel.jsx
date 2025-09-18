import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function OrderDetailsModal({
  isModalOpen,
  closeModal,
  selectedOrder,
  refresh, // <-- new prop
}) {

    const [status, setStatus] = useState(selectedOrder?.status);
    
  if (!isModalOpen || !selectedOrder) return null;

  const handleClose = () => {
    closeModal(false); // close modal
    if (refresh) refresh(); // refresh parent data
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex justify-center items-center">
      <div className="w-[800px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-8 relative flex flex-col gap-6">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-accent hover:text-white transition"
          onClick={handleClose}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-secondary flex items-center gap-2">
          Order Details
          <span className="text-sm bg-accent text-white px-3 py-1 rounded-full">
            {selectedOrder.oderID}
          </span>
        </h2>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-6 bg-primary/60 p-4 rounded-lg shadow-inner">
          <p>
            <span className="font-semibold text-secondary">👤 Customer:</span>{" "}
            {selectedOrder.customerName}
          </p>
          <p>
            <span className="font-semibold text-secondary">📧 Email:</span>{" "}
            {selectedOrder.email}
          </p>
          <p>
            <span className="font-semibold text-secondary">📞 Phone:</span>{" "}
            {selectedOrder.phone}
          </p>
          <p>
            <span className="font-semibold text-secondary">📍 Address:</span>{" "}
            {selectedOrder.address}
          </p>
          <p>
            <span className="font-semibold text-secondary">📅 Date:</span>{" "}
            {new Date(selectedOrder.date).toLocaleDateString("en-GB")}
          </p>
          <p>
            <span className="font-semibold text-secondary">🚦 Status:</span>{" "}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                selectedOrder.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : selectedOrder.status === "shipped"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {selectedOrder.status}
            </span>
          </p>
        </div>

        {/* Items */}
        <div>
          <h3 className="text-lg font-semibold text-secondary mb-3 border-b-2 border-accent w-fit pb-1">
            Items
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white hover:bg-primary/40 transition border-b"
                  >
                    <td className="p-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg shadow-sm"
                      />
                    </td>
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3">LKR {Number(item.price).toFixed(2)}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3 font-semibold text-secondary">
                      LKR {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status Dropdown, Save Button & Total */}
        <div className="flex justify-between mt-6 items-center">
          {/* Left Side: Status Dropdown & Save */}
          <div className="flex gap-4 items-center">
            {/* Status Dropdown */}
            <div className="bg-accent/10 px-4 py-2 rounded-lg shadow-inner">
              <select
                name="orderStatus"
                id="orderStatus"
                className="bg-transparent text-secondary font-semibold border-none outline-none text-sm cursor-pointer"
                defaultValue={selectedOrder.status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="processing">Processing</option>
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="returned">Returned</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            {/* Save Button */}
            <button
              className="px-5 py-2 bg-accent text-white rounded-lg shadow-lg hover:bg-accent/90 transition font-semibold"
              onClick={() => {
                const token = localStorage.getItem("token");
                axios.put(
                    `${import.meta.env.VITE_API_URL}/api/orders/status/${selectedOrder.oderID}`,
                    {
                        status: status,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                ).then(() => {
                    toast.success("Status updated successfully");
                    closeModal();
                    refresh();
                })
                .catch((err) => {
                    toast.error(err);
                    toast.error("Error updating status:");
                });
              }}
              disabled = {status == selectedOrder.status}
            >
              Save
            </button>
          </div>

          {/* Right Side: Total */}
          <div className="bg-accent/10 px-6 py-3 rounded-lg shadow-inner">
            <p className="text-xl font-bold text-secondary">
              Total:{" "}
              <span className="text-accent">
                LKR {Number(selectedOrder.total).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
