import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FaChevronDown, FaSignOutAlt, FaUserCog, FaShoppingBag } from "react-icons/fa";

export default function UserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-center items-center relative">
      {/* Loading Spinner */}
      {loading && (
        <div className="w-6 h-6 border-4 border-primary border-b-transparent rounded-full animate-spin"></div>
      )}

      {/* Logged-in user */}
      {!loading && user && (
        <div
          className="flex items-center gap-3 cursor-pointer relative"
          ref={menuRef}
        >
          <img
            src={user.image}
            alt="User"
            className="w-10 h-10 rounded-full border-2 border-accent object-cover shadow-md transition-transform duration-300 hover:scale-105"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <span
            className="text-secondary font-medium select-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {user.firstName}
          </span>
          <FaChevronDown
            size={14}
            className={`text-secondary transition-transform duration-300 ${
              menuOpen ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {/* Dropdown Menu */}
          {menuOpen && (
            <div
              className="absolute top-12 right-0 bg-secondary/95 text-primary rounded-lg shadow-lg py-2 w-44 border border-accent/30 z-50 animate-fade-in"
            >
              <button
                onClick={() => (window.location.href = "/settings")}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-accent hover:text-white transition-colors"
              >
                <FaUserCog className="mr-2 w-4 h-4" /> Account Settings
              </button>
              {/* <button
                onClick={() => (window.location.href = "/orders")}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-accent hover:text-white transition-colors"
              >
                <FaShoppingBag className="mr-2 w-4 h-4" /> Orders
              </button> */}
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-accent hover:text-white transition-colors"
              >
                <FaSignOutAlt className="mr-2 w-4 h-4" /> Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Not Logged In */}
      {!loading && !user && (
        <button
          onClick={() => (window.location.href = "/login")}
          className="bg-accent text-white px-5 py-2 rounded-lg shadow-md hover:bg-opacity-90 transition-all font-medium"
        >
          Login
        </button>
      )}
    </div>
  );
}
