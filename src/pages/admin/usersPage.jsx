import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";
import { MdOutlineAdminPanelSettings, MdVerified } from "react-icons/md";

function UserBlockConfirm(props) {
  const email = props.user.email;
  const close = props.close;
  const refresh = props.refresh;
  function blockUser() {
    const token = localStorage.getItem("token");

    axios
      .put(
        import.meta.env.VITE_API_URL + "/api/users/block/" + email,
        {
          isBlock: !props.user.isBlock,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("User Updated:", response.data);
        close();
        toast.success("User block status updated successfully");
        refresh();
        // window.location.reload();
      })
      .catch(() => {
        toast.error("Error blocking user");
      });
  }

  return (
    <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
      <div className="w-[500px] h-[200px] bg-primary rounded-lg shadow-lg p-6 relative flex flex-col justify-center items-center gap-[10px">
        <button
          onClick={close}
          className="absolute right-[-40px] w-[42px] top-[-42px] h-[40px] rounded-full bg-red-600 font-bold text-white border border-red-600 hover:bg-white hover:text-red-600"
        >
          X
        </button>
        <p className="text-xl font-semibold text-center">
          Are you sure you want to {props.user.isBlock ? "unblock" : "block"} the user with email : {email} ?
          <div className="flex gap-6 justify-center mt-6">
            <button
              onClick={blockUser}
              className="w-[100px] bg-red-600 p-[5px] text-white hover:bg-accent hover:text-black  "
            >
              Yes
            </button>
            <button
              onClick={close}
              className="w-[100px] bg-blue-600 p-[5px] text-white hover:bg-accent hover:text-black "
            >
              Cancel
            </button>
          </div>
        </p>
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

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (token == null) {
        toast.error("You must be logged in to add a product.");
        navigate("/login");
        return;
      }

      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/all-users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Products fetched:", response.data);
          setUsers(response.data);
          setIsLoading(false);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [isLoading]);

  return (
    <div className="w-full h-full p-6 bg-primary min-h-screen flex justify-center">
      {
        // if isDeleteConfirmVisible is true, show the ProductDeleteConfirm component
        isBlockConfirmVisible && (
          <UserBlockConfirm
            refresh={() => {
              setIsLoading(true);
            }}
            user={userToBlock}
            close={() => {
              setIsBlockConfirmVisible(false);
            }}
          />
        )
      }
      <div className="w-full max-w-7xl h-[97%] bg-white rounded-2xl shadow-xl p-4 min-h-screen">
        {/* Header with count */}
        <div className="flex items-center justify-between mb-6 border-b pb-3">
          <h1 className="text-2xl font-bold text-secondary">
            Users Management
          </h1>
          <span className="text-sm text-gray-600 bg-primary px-4 py-1 rounded-full">
            Total:{" "}
            <span className="font-semibold text-secondary">{users.length}</span>
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
                    "Image",
                    "Email",
                    "First Name",
                    "Last Name",
                    "Role",
                    "Actions",
                  ].map((heading, index) => (
                    <th
                      key={index}
                      className="p-4 text-secondary font-semibold text-sm uppercase border-b text-center"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className={`transition-colors duration-300 hover:bg-[#FEF9F4] ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-4 border-b text-center flex items-center justify-center">
                      <img
                        src={user.image}
                        referrerPolicy="no-referrer"
                        alt={user.firstName}
                        className={
                          "w-14 h-14 rounded-full object-cover border-4 " +
                          (user.isBlock ? "border-red-600" : "border-green-600")
                        }
                      />
                    </td>

                    <td className="p-4 border-b text-gray-700 text-sm text-center">
                      <div className="flex items-center gap-2 text-center justify-center">
                        <span>{user.email}</span>
                        {user.isEmailVerified && (
                          <MdVerified className="text-blue-500 text-lg" />
                        )}
                      </div>
                    </td>

                    <td className="p-4 border-b text-gray-800 font-medium text-center">
                      {user.firstName}
                    </td>
                    <td className="p-4 border-b text-gray-700 text-sm text-center">
                      {user.lastName}
                    </td>
                    <td className="p-4 border-b text-gray-700 text-sm ">
                      <div className="flex items-center justify-center gap-2">
                        {user.role === "admin" && (
                          <MdOutlineAdminPanelSettings className="text-purple-600 text-lg" />
                        )}
                        <span className="capitalize">{user.role}</span>
                      </div>
                    </td>

                    <td className="p-4 border-b">
                      <div className="flex gap-3 justify-center">
                        {
                          <button
                            onClick={() => {
                              setUserToBlock(user);
                              setIsBlockConfirmVisible(true);
                            }}
                            className="w-[80px] h-[40px] bg-accent hover:bg-accent/90 text-white text-sm font-semibold py-2 px-4 rounded-lg cursor-pointer"
                          >
                            {user.isBlock ? "Unblock" : "Block"}
                          </button>
                        }
                      </div>
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
