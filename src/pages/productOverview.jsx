import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import { Loader } from "../components/loader";

export default function ProductOverview() {
  const params = useParams();
  //loading, success, error
  const [status, setStaus] = useState("loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products/" + params.id)
      .then((res) => {
        setProduct(res.data);
        setStaus("success");
      })
      .catch(() => {
        toast.error("Error fetching products");
        setStaus("error");
      });
  }, []);

  console.log(params);

  return(

    <div>

      {
        status == "loading" && <Loader />
      }
      {
        status == "success" && 
        
        (<div className="">



        </div>)

      }
      {
        status == "error" && <h1 className="text-red-500">Error</h1>
      }

    </div>
  ) 
}
