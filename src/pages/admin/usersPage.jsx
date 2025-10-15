import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader";

function UserBlockConfirm(props) {
  const email = props.email;
  const close = props.close;
  const refresh = props.refresh;
  function blockUser() {
    const token = localStorage.getItem("token");

    // axios
    //   .delete(import.meta.env.VITE_API_URL + "/api/products/" + productID, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     console.log("Product deleted:", response.data);
    //     close();
    //     toast.success("Product deleted successfully");
    //     refresh();
    //     // window.location.reload();
    //   })
    //   .catch(() => {
    //     toast.error("Error deleting product");
    //   });
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
        <p className="text-xl font-semibold">
          Are you sure you want to block the user with email : {email} ?
          <div className="flex gap-6 justify-center mt-6">
            <button
              onClick={blockUser}
              className="w-[100px] bg-red-600 p-[5px] text-white hover:bg-accent hover:text-black  "
            >
              Block
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
      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/all-users")
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
          <ProductDeleteConfirm
            refresh={() => {
              setIsLoading(true);
            }}
            productID={productToDelete}
            close={() => {
              setIsDeleteConfirmVisible(false);
            }}
          />
        )
      }
      <Link
        to="/admin/add-product"
        className="fixed right-[50px] bottom-[50px] text-5xl hover:text-accent px-4"
      >
        <CiCirclePlus />
      </Link>
      <div className="w-full max-w-7xl h-[97%] bg-white rounded-2xl shadow-xl p-4">
        {/* Header with count */}
        <div className="flex items-center justify-between mb-6 border-b pb-3">
          <h1 className="text-2xl font-bold text-secondary">
            Products Management
          </h1>
          <span className="text-sm text-gray-600 bg-primary px-4 py-1 rounded-full">
            Total:{" "}
            <span className="font-semibold text-secondary">
              {products.length}
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
                    "Image",
                    "Product ID",
                    "Product Name",
                    "Price",
                    "Labled Price",
                    "Category",
                    "Stock",
                    "Actions",
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
                {products.map((item, index) => (
                  <tr
                    key={index}
                    className={`transition-colors duration-300 hover:bg-[#FEF9F4] ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="p-4 border-b">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-14 h-14 rounded-md object-cover border border-gray-200 shadow-sm"
                      />
                    </td>
                    <td className="p-4 border-b text-gray-700 text-sm">
                      {item.productID}
                    </td>
                    <td className="p-4 border-b text-gray-800 font-medium">
                      {item.name}
                    </td>
                    <td className="p-4 border-b text-gray-700 text-sm">
                      ${item.price}
                    </td>
                    <td className="p-4 border-b text-gray-700 text-sm">
                      ${item.labledPrice}
                    </td>
                    <td className="p-4 border-b text-gray-700 text-sm">
                      {item.category}
                    </td>
                    <td className="p-4 border-b text-gray-700 text-sm">
                      {item.stock}
                    </td>
                    <td className="p-4 border-b">
                      <div className="flex gap-3 justify-center">
                        <button
                          className="p-2 rounded-full hover:bg-red-50 text-gray-600 hover:text-red-600 transition"
                          title="Delete"
                          onClick={() => {
                            setProductToDelete(item.productID);
                            setIsDeleteConfirmVisible(true);
                          }}
                        >
                          <IoTrashOutline size={18} />
                        </button>
                        <button
                          className="p-2 rounded-full hover:bg-primary text-gray-600 hover:text-accent transition"
                          title="Edit"
                          onClick={() =>
                            navigate("/admin/update-product", {
                              state: item,
                            })
                          }
                        >
                          <FaRegEdit size={18} />
                        </button>
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
