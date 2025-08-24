import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";

export default function AdminProductPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URI + "/api/products").then(
        (response) => {
            console.log(response.data);
            setProducts(response.data);
        }
    );
    } , []);
    
    return (
        <div className="w-full h-full p-[10px]">

            <table className="border w-full text-center">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Labled Price</th>
                        <th>Category</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(
                            (item , index) => {
                                return (
                                    <tr key={index}>
                                        <td><img src={item.images[0]} className="w-16 h-16 object-cover" /></td>
                                        <td>{item.productID}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.labledPrice}</td>
                                        <td>{item.category}</td>
                                        <td>
                                            <div className="flex flex-row gap-[20px] justify-center items-center">
                                                <IoTrashOutline className="hover:text-red-600"/>
                                                <FaRegEdit className="hover:text-accent"/>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }
                        )
                    }
                </tbody>
            </table>


        </div>
    );
}