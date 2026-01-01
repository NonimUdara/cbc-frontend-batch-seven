import axios from "axios";
import { useEffect, useState } from "react";

export default function UserMobileData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-full">
      {/* Logout Modal */}
      {isLogoutConfirmOpen && (
        <div className="fixed inset-0 z-[120] h-screen bg-black/40 flex justify-center items-center">
          <div className="w-[300px] bg-primary rounded-lg p-6 flex flex-col items-center gap-4">
            <span className="text-secondary text-center font-medium">
              Are you sure you want to logout?
            </span>

            <div className="flex gap-3">
              <button
                className="bg-accent text-white px-4 py-2 rounded-md"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </button>
              <button
                className="bg-secondary text-white px-4 py-2 rounded-md"
                onClick={() => setIsLogoutConfirmOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="w-[30px] h-[30px] border-[3px] border-accent border-b-transparent rounded-full animate-spin" />
      )}

      {/* Logged User */}
      {user && !loading && (
        <div className="flex items-center gap-2">
          <img
            src={user.image}
            alt="user"
            className="w-[40px] h-[40px] rounded-full border-2 border-primary object-cover"
          />

          <span className="text-secondary font-medium">{user.firstName}</span>

          <select
            className="bg-secondary text-white px-2 py-1 rounded-md w-[95px] cursor-pointer hover:bg-accent transition-colors"
            onChange={(e) => {
              const value = e.target.value;

              if (value === "account") {
                window.location.href = "/settings";
              }

              if (value === "orders") {
                window.location.href = "/orders";
              }

              if (value === "logout") {
                setIsLogoutConfirmOpen(true);
              }

              e.target.value = ""; // reset dropdown
            }}
          >
            <option value="" hidden>
              Settings
            </option>
            <option value="account" >Account </option>
            <option value="orders">Orders</option>
            <option value="logout">Logout</option>
          </select>
        </div>
      )}

      {/* Guest */}
      {!loading && !user && (
        <button
          className="bg-accent text-white px-4 py-2 rounded-md"
          onClick={() => (window.location.href = "/login")}
        >
          Login
        </button>
      )}
    </div>
  );
}
