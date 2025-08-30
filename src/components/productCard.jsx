export default function ProductCard(props) {

    const product = props.product;

    return (
        <div className="w-[300px] h-[400px] shadow-2xl m-3 flex flex-col p-[10px] ">
            <img className="w-full h-[250px] object-cover " src={product.images[0]} alt="" />
            <h1 className="text-xl font-bold text-secondary ">
                {product.name}
            </h1>
            {
                product.labledPrice > product.price ?
                    <div className="flex items-center gap-3">
                        <p className="text-lg text-secondary font-semibold line-through ">LKR {product.labledPrice.toFixed(2)}</p>
                        <p className="text-lg text-accent font-semibold ">LKR {product.price.toFixed(2)}</p>

                    </div> :
                    <p className="text-lg text-accent font-semibold ">LKR {product.price.toFixed(2)}</p>
            }
            <p className="text-sm text-secondary/70">{product.productID}</p>
            <p className="text-sm text-secondary/70">{product.category}</p>
            <button className="w-full h-[30px] mt-[5px] border border-accent text-accent hover:bg-accent hover:text-white " >
                View Product
            </button>
        </div>
    )
}