import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useParams } from "react-router-dom";
import { Loader } from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { addToCart, loadCart } from "../utils/cart";

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

  return (
    <div className="w-full h-[calc(100vh-100px)] text-secondary ">
      {status == "loading" && <Loader />}
      {status == "success" && (
        <div className="w-full h-full flex">
          <div className="w-[50%] h-full flex justify-center items-center">
            <div className="m-auto">
              <ImageSlider images={product.images} />
            </div>
          </div>
          <div className="w-[50%] h-full flex flex-col items-center gap-4 p-10">
            <span className="">{product.productID}</span>
            <h1 className="text-2xl font-bold text-center">
              {product.name}
              {product.altNames.map((name, index) => {
                return (
                  <span
                    key={index}
                    className="text-sm font-normal text-secondary/70"
                  >
                    {" | " + name}
                  </span>
                );
              })}
            </h1>
            <p className="mt-[30px] text-justify ">{product.description}</p>
            {/* <div className="w-full h-[50px] ">
              <span className="rounded-full w-[100px] h-[30px] border-[2px] text-center border-secondary">
                {product.category}
              </span>
            </div> */}
            {/*category*/}
            <div className="w-full h-[50px] justify-center flex items-center gap-2">
              <span className="text-sm font-semibold">Category:</span>
              <span className="rounded-full w-[100px] h-[30px] border-[2px] text-center border-secondary">
                {product.category}
              </span>
            </div>
            {product.labledPrice > product.price ? (
              <div className="flex items-center gap-3">
                <p className="text-lg text-secondary font-semibold line-through ">
                  LKR {product.labledPrice.toFixed(2)}
                </p>
                <p className="text-lg text-accent font-semibold ">
                  LKR {product.price.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-lg text-accent font-semibold ">
                LKR {product.price.toFixed(2)}
              </p>
            )}
            <div className="w-full h-[40px] flex gap-2">
              <button
                className="w-full h-full border border-accent text-accent hover:bg-accent hover:text-white"
                onClick={() => {
                  addToCart(product, 1);
                  toast.success("Product added to cart");
                }}
              >
                Add to Cart
              </button>

              <Link
                to="/checkout"
                state={[{
                  image: product.images[0],
                  name: product.name,
                  price: product.price,
                  labledPrice: product.labledPrice,
                  quantity: 1
                }]}
                className="w-full h-full flex items-center justify-center border bg-accent border-accent text-white hover:bg-white hover:text-accent"
                onClick={() => {
                  console.log(loadCart());
                }}
              >
                Buy now
              </Link>
            </div>
          </div>
        </div>
      )}
      {status == "error" && <h1 className="text-red-500">Error</h1>}
    </div>
  );
}
