import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { Loader } from "../../components/loader";
import { CiCirclePlus } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const fetchProducts = useCallback(() => {
    setIsLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch products");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      {/* ---------------- DELETE CONFIRM POPUP ---------------- */}
      {isDeleteConfirmVisible && (
        <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
          <div className="w-[500px] h-[200px] bg-white rounded-lg shadow-lg p-6 relative flex flex-col justify-center items-center gap-[10px]">
            <button
              onClick={() => setIsDeleteConfirmVisible(false)}
              className="absolute right-[-40px] w-[42px] top-[-42px] h-[40px] rounded-full bg-red-600 font-bold text-white border border-red-600 hover:bg-white hover:text-red-600"
            >
              X
            </button>
            <p className="text-xl font-semibold text-center">
              Are you sure you want to delete product {productToDelete}?
            </p>
            <div className="flex gap-6 justify-center mt-6">
              <button
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    await axios.delete(
                      `${import.meta.env.VITE_API_URL}/api/products/${productToDelete}`,
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                    toast.success("Product deleted successfully");
                    setIsDeleteConfirmVisible(false);
                    fetchProducts();
                  } catch (error) {
                    toast.error(
                      error?.response?.data?.message || "Failed to delete product"
                    );
                  }
                }}
                className="w-[100px] bg-red-600 p-[5px] text-white hover:bg-accent hover:text-black"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteConfirmVisible(false)}
                className="w-[100px] bg-blue-600 p-[5px] text-white hover:bg-accent hover:text-black"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- MAIN CONTAINER ---------------- */}
      <div className="w-full h-full flex flex-col gap-6 overflow-hidden">
        {/* ---------------- ADD PRODUCT BUTTON ---------------- */}
        <Link
          to="/admin/add-product"
          className="fixed bottom-8 right-8 text-5xl text-secondary hover:text-accent transition z-50"
        >
          <CiCirclePlus />
        </Link>

        {/* ---------------- HEADER ---------------- */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-secondary">Products Management</h1>
          <div className="bg-primary px-4 py-1 rounded-full text-sm">
            Total Products:{" "}
            <span className="font-semibold text-secondary">{products.length}</span>
          </div>
        </div>

        {/* ---------------- CONTENT AREA (SCROLLABLE) ---------------- */}
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
                        "Image",
                        "Product ID",
                        "Name",
                        "Price",
                        "Label Price",
                        "Category",
                        "Stock",
                        "Actions",
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
                    {products.map((item, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-[#FEF9F4] transition cursor-pointer ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <img
                            src={item.images?.[0]}
                            alt={item.name}
                            className="w-12 h-12 rounded-md object-cover border"
                          />
                        </td>
                        <td className="px-4 py-3">{item.productID}</td>
                        <td className="px-4 py-3 font-medium">{item.name}</td>
                        <td className="px-4 py-3">${item.price}</td>
                        <td className="px-4 py-3">${item.labledPrice}</td>
                        <td className="px-4 py-3">{item.category}</td>
                        <td className="px-4 py-3">{item.stock}</td>
                        <td className="px-4 py-3 flex gap-4">
                          <button
                            onClick={() => {
                              setProductToDelete(item.productID);
                              setIsDeleteConfirmVisible(true);
                            }}
                            className="p-2 rounded-full hover:bg-red-50 text-gray-600 hover:text-red-600 transition"
                          >
                            <IoTrashOutline size={18} />
                          </button>
                          <button
                            onClick={() =>
                              navigate("/admin/update-product", { state: item })
                            }
                            className="p-2 rounded-full hover:bg-primary text-gray-600 hover:text-accent transition"
                          >
                            <FaRegEdit size={18} />
                          </button>
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
              {products.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md border p-4 transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-secondary">{item.name}</span>
                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                      Stock: {item.stock}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p><b>Product ID:</b> {item.productID}</p>
                    <p><b>Price:</b> ${item.price}</p>
                    <p><b>Label Price:</b> ${item.labledPrice}</p>
                    <p><b>Category:</b> {item.category}</p>
                  </div>

                  <div className="flex gap-4 mt-3 justify-end">
                    <button
                      onClick={() => {
                        setProductToDelete(item.productID);
                        setIsDeleteConfirmVisible(true);
                      }}
                      className="p-2 rounded-full hover:bg-red-50 text-gray-600 hover:text-red-600 transition"
                    >
                      <IoTrashOutline size={18} />
                    </button>
                    <button
                      onClick={() =>
                        navigate("/admin/update-product", { state: item })
                      }
                      className="p-2 rounded-full hover:bg-primary text-gray-600 hover:text-accent transition"
                    >
                      <FaRegEdit size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
