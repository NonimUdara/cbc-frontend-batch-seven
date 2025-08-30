import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminUpdateProduct() {
    
    const location = useLocation();
    console.log(location.state);

    const [productID, setProductID] = useState(location.state.productID);
    const [name, setName] = useState(location.state.name);
    const [altNames, setAltNames] = useState(location.state.altNames.join(", "));
    const [description, setDescription] = useState(location.state.description);
    const [images, setImages] = useState([]);
    const [price, setPrice] = useState(location.state.price);
    const [labledPrice, setLabledPrice] = useState(location.state.labledPrice);
    const [category, setCategory] = useState(location.state.category);
    const [stock, setStock] = useState(location.state.stock);

    const navigate = useNavigate();

    async function updateProduct() {

        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("You must be logged in to add a product.");
            navigate("/login");
            return;
        }

        const promises = [];
        for (let i = 0; i < images.length; i++) {

            //console.log(images[i])
            promises[i] = mediaUpload(images[i]);

        }

        try {
            let urls = await Promise.all(promises);

            if(urls.length == 0){
                urls = location.state.images;
            }

            const alternativeNames = altNames.split(",").map(name => name.trim());

            const product = {
                productID : productID,
                name: name,
                altNames: alternativeNames,
                description: description,
                images: urls,
                price: price,
                labledPrice: labledPrice,
                category: category,
                stock: stock
            }

            axios.put(import.meta.env.VITE_API_URL + "/api/products/"+productID,product,{
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(() => {
                toast.success("Product updated successfully!");
                navigate("/admin/products");
            }).catch((e) => {
                console.error("Error adding product:", e);
                toast.error("Error adding product. Please try again.");
            })


        } catch (e) {
            toast.error("Error uploading images. Please try again.");
            return;
        }

    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-primary p-6">
            <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 border border-accent relative">
                <h2 className="text-3xl font-bold text-secondary mb-6 text-left">
                    Update Product
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product ID */}
                    <div className="flex flex-col">
                        <label className="text-secondary font-semibold mb-2">Product ID</label>
                        <input
                            disabled
                            placeholder="Enter unique product ID"
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                            value={productID}
                            onChange={(e) => setProductID(e.target.value)}
                        />
                    </div>

                    {/* Product Name */}
                    <div className="flex flex-col">
                        <label className="text-secondary font-semibold mb-2">Name</label>
                        <input
                            placeholder="Enter product name"
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Alternative Names */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-secondary font-semibold mb-2">Alternative Names</label>
                        <input
                            placeholder="Enter alternative names (comma separated)"
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                            value={altNames}
                            onChange={(e) => setAltNames(e.target.value)}
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-secondary font-semibold mb-2">Description</label>
                        <textarea
                            placeholder="Write a detailed product description..."
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-secondary font-semibold mb-2">Product Images</label>
                        <input
                            type="file"
                            className="block w-full text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file:bg-accent file:text-white file:font-semibold file:px-4 file:py-2 file:rounded-lg hover:file:bg-orange-600"
                            onChange={(e) => setImages(e.target.files)}
                            multiple
                        />
                    </div>

                    {/* Price */}
                    <div className="flex flex-col">
                        <label className="text-secondary font-semibold mb-2">Price</label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    {/* Labled Price */}
                    <div className="flex flex-col">
                        <label className="text-secondary font-semibold mb-2">Labled Price</label>
                        <input
                            type="number"
                            placeholder="Enter labled price"
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                            value={labledPrice}
                            onChange={(e) => setLabledPrice(e.target.value)}
                        />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col">
                        <label className="text-secondary font-semibold mb-2">Category</label>
                        <select
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent bg-white"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="fashion">Fashion</option>
                            <option value="home">Home</option>
                            <option value="books">Books</option>
                        </select>
                    </div>

                    {/* Stock */}
                    <div className="flex flex-col">
                        <label className="text-secondary font-semibold mb-2">Stock</label>
                        <input
                            type="number"
                            placeholder="Enter stock quantity"
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="mt-10 flex justify-end gap-4">
                    <button
                        onClick={() => {
                            navigate("/admin/products")
                        }}
                        type="button"
                        className="bg-gray-300 text-secondary font-semibold px-6 py-3 rounded-lg hover:bg-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-[2px] hover:border-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={updateProduct}
                        className="bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-[2px] hover:border-secondary"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
