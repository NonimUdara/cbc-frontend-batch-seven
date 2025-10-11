import axios from "axios";
import { useEffect, useState } from "react";

export default function UserMobileData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token !== null) {
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
    <div className="flex justify-center items-center">
      {isLogoutConfirmOpen && (
        <div className="fixed z-[120] inset-0 bg-black/40 flex justify-center items-center">
          <div className="w-[300px] bg-primary rounded-lg shadow-xl p-6 flex flex-col justify-center items-center gap-4 animate-fade-in">
            <span className="text-secondary text-center font-medium">
              Are you sure you want to logout?
            </span>

            <div className="flex gap-3 mt-3">
              <button
                className="bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/90 transition-all"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </button>
              <button
                className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary/90 transition-all"
                onClick={() => setIsLogoutConfirmOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="w-[30px] h-[30px] border-[3px] border-white border-b-transparent rounded-full animate-spin "></div>
      )}
      {user && (
        <div className="h-full w-full flex justify-center items-center ">
          <img
            src={user.image}
            alt=""
            className="w-[40px] h-[40px] rounded-full border-[2px] border-primary object-cover"
          />
          <span className="text-secondary ml-2">{user.firstName}</span>
          <select
            onChange={(e) => {
              if (e.target.value === "logout") {
                setIsLogoutConfirmOpen(true);
              }
            }}
            className="bg-accent text-white ml-2 max-w-[20px]"
          >
            <option value="" className="hidden"></option>
            <option value="">Account Settings</option>
            <option value={"logout"}>Logout</option>
            <option value="">Orders</option>
          </select>
        </div>
      )}
      {!loading && user === null && (
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
