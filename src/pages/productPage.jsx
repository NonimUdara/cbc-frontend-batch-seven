import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "../components/loader";
import ProductCard from "../components/productCard";

export default function ProductPage () {

    const[products, setProducts] = useState([]);
    const[isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(isLoading) {
            axios.get(import.meta.env.VITE_API_URL + "/api/products").then(
                (response) => {
                    setProducts(response.data);
                    console.log("Products fetched:", response.data);
                    setIsLoading(false);
                }
            ).catch((error) => {
                console.log("Error fetching products:", error);
                setIsLoading(false);
                toast.error("Error fetching products");
            }
            );
        }
    }, []);



    return (
        <div className="w-full min-h-[calc(100vh-100px)] bg-primary">
            {
                isLoading ? <Loader /> 
                
                : 

                <div className="w-full h-full flex flex-row flex-wrap justify-center items-center bg-primary p-5 ">
                    {
                        products.map((item) => {
                            return(
                              <ProductCard product={item} key={item.productID} />
                            )
                        })
                    }
                </div>    
                    
            }
        </div>
    )

}