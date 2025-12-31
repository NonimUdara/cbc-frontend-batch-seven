import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineAdminPanelSettings, MdVerified } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";

function UserBlockConfirm({ user, close, refresh }) {
  const email = user.email;

  const blockUser = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/block/${email}`,
        { isBlock: !user.isBlock },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("User block status updated successfully");
      close();
      refresh();
    } catch {
      toast.error("Error blocking user");
    }
  };

  return (
    <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
      <div className="w-[500px] h-[200px] bg-primary rounded-lg shadow-lg p-6 relative flex flex-col justify-center items-center gap-[10px]">
        <button
          onClick={close}
          className="absolute right-[-40px] top-[-42px] w-[42px] h-[40px] rounded-full bg-red-600 font-bold text-white border border-red-600 hover:bg-white hover:text-red-600"
        >
          X
        </button>
        <p className="text-xl font-semibold text-center">
          Are you sure you want to {user.isBlock ? "unblock" : "block"} the user
          with email: {email}?
        </p>
        <div className="flex gap-6 justify-center mt-6">
          <button
            onClick={blockUser}
            className="w-[100px] bg-red-600 p-[5px] text-white hover:bg-accent hover:text-black"
          >
            Yes
          </button>
          <button
            onClick={close}
            className="w-[100px] bg-blue-600 p-[5px] text-white hover:bg-accent hover:text-black"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [isBlockConfirmVisible, setIsBlockConfirmVisible] = useState(false);
  const [userToBlock, setUserToBlock] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const fetchUsers = useCallback(() => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_API_URL + "/api/users/all-users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load users");
        setIsLoading(false);
      });
  }, [navigate]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      {/* ---------------- BLOCK CONFIRM POPUP ---------------- */}
      {isBlockConfirmVisible && userToBlock && (
        <UserBlockConfirm
          user={userToBlock}
          close={() => setIsBlockConfirmVisible(false)}
          refresh={fetchUsers}
        />
      )}

      {/* ---------------- MAIN CONTAINER ---------------- */}
      <div className="w-full h-full flex flex-col gap-6 overflow-hidden">
        {/* ---------------- HEADER ---------------- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-secondary">
            Users Management
          </h1>
          <div className="bg-primary px-4 py-1 rounded-full text-sm">
            Total Users:{" "}
            <span className="font-semibold text-secondary">{users.length}</span>
          </div>
        </div>

        {/* ---------------- CONTENT AREA ---------------- */}
        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block bg-white rounded-xl shadow-lg border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-primary sticky top-0 z-10">
                      <tr>
                        {[
                          "Image",
                          "Email",
                          "First Name",
                          "Last Name",
                          "Role",
                          "Actions",
                        ].map((h, idx) => (
                          <th
                            key={idx}
                            className="p-4 text-secondary font-semibold text-sm text-center"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, idx) => (
                        <tr
                          key={idx}
                          className={`transition-colors duration-300 hover:bg-[#FEF9F4] ${
                            idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <td className="p-4 text-center">
                            <img
                              src={user.image}
                              referrerPolicy="no-referrer"
                              alt={user.firstName}
                              className={`inline-block w-14 h-14 rounded-full object-cover border-4 ${
                                user.isBlock
                                  ? "border-red-600"
                                  : "border-green-600"
                              }`}
                            />
                          </td>

                          <td className="p-4 text-sm text-center flex items-center justify-center gap-2">
                            {user.email}
                            {user.isEmailVerified && (
                              <MdVerified className="text-blue-500 text-lg" />
                            )}
                          </td>
                          <td className="p-4 text-gray-800 font-medium text-center">
                            {user.firstName}
                          </td>
                          <td className="p-4 text-gray-700 text-sm text-center">
                            {user.lastName}
                          </td>
                          <td className="p-4 text-gray-700 text-sm text-center">
                            <div className="flex items-center justify-center gap-2">
                              {user.role === "admin" && (
                                <MdOutlineAdminPanelSettings className="text-purple-600 text-lg" />
                              )}
                              <span className="capitalize">{user.role}</span>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <button
                              onClick={() => {
                                setUserToBlock(user);
                                setIsBlockConfirmVisible(true);
                              }}
                              className="w-[80px] h-[40px] bg-accent hover:bg-accent/90 text-white text-sm font-semibold rounded-lg"
                            >
                              {user.isBlock ? "Unblock" : "Block"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ---------------- MOBILE CARDS ---------------- */}
              <div className="grid grid-cols-1 gap-4 lg:hidden">
                {users.map((user, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl shadow-md border p-4 transition"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-secondary">
                        {user.email}
                      </span>
                      <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                        {user.isBlock ? "Blocked" : "Active"}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <b>Name:</b> {user.firstName} {user.lastName}
                      </p>
                      <p>
                        <b>Role:</b> {user.role}
                      </p>
                      <p>
                        <b>Email Verified:</b>{" "}
                        {user.isEmailVerified ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="flex gap-4 mt-3 justify-end">
                      <button
                        onClick={() => {
                          setUserToBlock(user);
                          setIsBlockConfirmVisible(true);
                        }}
                        className="w-[80px] h-[40px] bg-accent hover:bg-accent/90 text-white text-sm font-semibold rounded-lg"
                      >
                        {user.isBlock ? "Unblock" : "Block"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
