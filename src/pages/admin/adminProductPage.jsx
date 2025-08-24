import axios from "axios";
import { useState } from "react";

export default function AdminProductPage() {

    const [products, setProducts] = useState([]);

    axios.get(import.meta.env.VITE_API_URI + "/api/products").then(
        (response) => {
            console.log(response.data);
            setProducts(response.data);
        }
    );
    console.log(products);

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